import { neon } from '@neondatabase/serverless'
import bcryptjs from 'bcryptjs'

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('DATABASE_URL not set')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

async function initAdmin() {
  try {
    // Hash the password
    const password = 'admin123'
    const salt = await bcryptjs.genSalt(10)
    const passwordHash = await bcryptjs.hash(password, salt)

    // Insert admin user
    const result = await sql`
      INSERT INTO admin_users (username, password_hash, email)
      VALUES ('admin', ${passwordHash}, 'admin@airegistry.dev')
      RETURNING id, username, email
    `

    console.log('Admin user created:', result[0])
    console.log('Username: admin')
    console.log('Password: admin123')
  } catch (error: any) {
    if (error.message?.includes('duplicate key')) {
      console.log('Admin user already exists')
    } else {
      console.error('Error creating admin user:', error)
      process.exit(1)
    }
  }
}

initAdmin()
