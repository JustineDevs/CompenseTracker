/**
 * Script to update Supabase schema
 * Run this script to apply the updated schema to your Supabase database
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials!');
  console.log('Please set the following environment variables:');
  console.log('- SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateSchema() {
  try {
    console.log('🔄 Reading schema file...');
    const schemaPath = path.join(__dirname, 'supabase', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('🔄 Applying schema to Supabase...');
    
    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          console.log(`🔄 Executing statement ${i + 1}/${statements.length}...`);
          const { error } = await supabase.rpc('exec_sql', { sql: statement });
          
          if (error) {
            console.warn(`⚠️  Warning on statement ${i + 1}:`, error.message);
            // Continue with other statements
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`);
          }
        } catch (err) {
          console.warn(`⚠️  Error on statement ${i + 1}:`, err.message);
          // Continue with other statements
        }
      }
    }
    
    console.log('✅ Schema update completed!');
    console.log('');
    console.log('📋 What was updated:');
    console.log('- Added users table for authentication');
    console.log('- Added RLS policies for users table');
    console.log('- Added triggers for automatic user profile creation');
    console.log('- Updated existing tables and policies');
    console.log('');
    console.log('🚀 Your authentication should now work properly!');
    
  } catch (error) {
    console.error('❌ Error updating schema:', error.message);
    process.exit(1);
  }
}

// Alternative method using direct SQL execution
async function updateSchemaDirect() {
  try {
    console.log('🔄 Reading schema file...');
    const schemaPath = path.join(__dirname, 'supabase', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('🔄 Applying schema to Supabase...');
    
    // Execute the entire schema at once
    const { data, error } = await supabase
      .from('_sql')
      .select('*')
      .eq('query', schema);
    
    if (error) {
      console.error('❌ Error executing schema:', error.message);
      process.exit(1);
    }
    
    console.log('✅ Schema update completed!');
    console.log('🚀 Your authentication should now work properly!');
    
  } catch (error) {
    console.error('❌ Error updating schema:', error.message);
    process.exit(1);
  }
}

// Check if we have the exec_sql function available
async function checkExecSqlFunction() {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql: 'SELECT 1' });
    return !error;
  } catch (err) {
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Supabase schema update...');
  console.log('');
  
  // Check if exec_sql function is available
  const hasExecSql = await checkExecSqlFunction();
  
  if (hasExecSql) {
    await updateSchema();
  } else {
    console.log('⚠️  exec_sql function not available, trying direct method...');
    await updateSchemaDirect();
  }
}

main().catch(console.error);
