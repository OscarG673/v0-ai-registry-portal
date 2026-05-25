import bcryptjs from 'bcryptjs'
import { neon } from '@neondatabase/serverless'
import { cookies } from 'next/headers'

const getSql = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  return neon(process.env.DATABASE_URL)
}

interface AdminUser {
  id: number
  username: string
  email: string | null
}

const COOKIE_NAME = 'admin_session'
const COOKIE_SECRET = process.env.NEON_AUTH_COOKIE_SECRET || 'default-secret-change-this'

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10)
  return bcryptjs.hash(password, salt)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcryptjs.compare(password, hash)
}

export async function createAdminUser(
  username: string,
  password: string,
  email?: string
): Promise<AdminUser> {
  const sql = getSql()
  const hashedPassword = await hashPassword(password)
  const result = await sql`
    INSERT INTO admin_users (username, password_hash, email)
    VALUES (${username}, ${hashedPassword}, ${email || null})
    RETURNING id, username, email
  `
  return result[0] as AdminUser
}

export async function getAdminByUsername(username: string) {
  const sql = getSql()
  const result = await sql`
    SELECT id, username, password_hash, email FROM admin_users WHERE username = ${username}
  `
  return result.length > 0 ? result[0] : null
}

export async function setAdminSession(adminId: number) {
  const cookieStore = await cookies()
  // In production, this should be encrypted with the secret
  const sessionData = JSON.stringify({ adminId, timestamp: Date.now() })
  cookieStore.set(COOKIE_NAME, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getAdminSession(): Promise<{ adminId: number } | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(COOKIE_NAME)?.value

  if (!session) {
    return null
  }

  try {
    const data = JSON.parse(session)
    return { adminId: data.adminId }
  } catch {
    return null
  }
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getAuthenticatedAdmin(): Promise<AdminUser | null> {
  const session = await getAdminSession()
  if (!session) {
    return null
  }

  const sql = getSql()
  const result = await sql`
    SELECT id, username, email FROM admin_users WHERE id = ${session.adminId}
  `
  return result.length > 0 ? (result[0] as AdminUser) : null
}
