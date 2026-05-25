import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

async function setupAdmin() {
  const DATABASE_URL = process.env.DATABASE_URL
  
  if (!DATABASE_URL) {
    console.error('DATABASE_URL environment variable is not set')
    process.exit(1)
  }

  const sql = neon(DATABASE_URL)
  
  const username = 'admin'
  const password = 'admin123'
  
  // Hash the password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  try {
    // Check if admin already exists
    const existing = await sql`SELECT id FROM admin_users WHERE username = ${username}`
    
    if (existing.length > 0) {
      console.log('Admin user already exists. Updating password...')
      await sql`UPDATE admin_users SET password_hash = ${passwordHash} WHERE username = ${username}`
      console.log('Admin password updated successfully!')
    } else {
      await sql`INSERT INTO admin_users (username, password_hash, email) VALUES (${username}, ${passwordHash}, 'admin@example.com')`
      console.log('Admin user created successfully!')
    }
    
    console.log('\nDefault admin credentials:')
    console.log('  Username: admin')
    console.log('  Password: admin123')
    console.log('\n⚠️  Please change the password after first login!')
    
  } catch (error) {
    console.error('Error setting up admin user:', error)
    process.exit(1)
  }
}

setupAdmin()
