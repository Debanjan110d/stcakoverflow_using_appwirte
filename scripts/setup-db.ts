#!/usr/bin/env ts-node
/**
 * Database Setup Script
 * Run this ONCE to setup your Appwrite database and tables
 * 
 * Usage: npm run setup-db
 */

import createDB from '../src/models/server/dbSetup'
import createQuestionAttachmentBucket from '../src/models/server/storageSetup'

async function main() {
  console.log('🚀 Starting database setup...\n')
  
  try {
    await createDB()
    console.log('\n✅ Database and tables setup complete!')
    
    await createQuestionAttachmentBucket()
    console.log('✅ Storage bucket setup complete!')
    
    console.log('\n🎉 Setup finished successfully!')
    console.log('You can now run: npm run dev')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Setup failed:', error)
    process.exit(1)
  }
}

main()
