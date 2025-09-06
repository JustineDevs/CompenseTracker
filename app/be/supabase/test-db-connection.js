/**
 * Test script to verify Supabase database connection and schema
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.log('Please set the following environment variables:');
  console.log('- SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('🔄 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      
      if (error.message.includes('relation "users" does not exist')) {
        console.log('');
        console.log('🔧 The "users" table does not exist!');
        console.log('Please run the database update script:');
        console.log('1. Go to your Supabase dashboard');
        console.log('2. Open SQL Editor');
        console.log('3. Run the contents of app/be/supabase/schema.sql');
        console.log('');
        return false;
      }
      
      return false;
    }
    
    console.log('✅ Connection successful!');
    return true;
    
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    return false;
  }
}

async function testSchema() {
  try {
    console.log('🔄 Testing database schema...');
    
    // Check if users table exists and has correct structure
    const { data, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, created_at, updated_at')
      .limit(1);
    
    if (error) {
      console.error('❌ Schema test failed:', error.message);
      return false;
    }
    
    console.log('✅ Users table exists and is accessible');
    
    // Check if RLS is enabled
    const { data: rlsData, error: rlsError } = await supabase
      .rpc('check_rls_enabled', { table_name: 'users' });
    
    if (rlsError) {
      console.log('⚠️  Could not check RLS status (this is normal)');
    } else {
      console.log('✅ RLS policies are configured');
    }
    
    return true;
    
  } catch (err) {
    console.error('❌ Schema test error:', err.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Testing CompenseTracker Database Connection');
  console.log('==============================================');
  console.log('');
  
  const connectionOk = await testConnection();
  
  if (connectionOk) {
    const schemaOk = await testSchema();
    
    if (schemaOk) {
      console.log('');
      console.log('🎉 Database is ready for authentication!');
      console.log('');
      console.log('Next steps:');
      console.log('1. Start your frontend: cd app/fe && npm run dev');
      console.log('2. Test Google OAuth sign-in');
      console.log('3. Test email sign-up');
    } else {
      console.log('');
      console.log('❌ Database schema needs to be updated');
      console.log('Please run the database update script');
    }
  } else {
    console.log('');
    console.log('❌ Database connection failed');
    console.log('Please check your Supabase credentials and try again');
  }
}

main().catch(console.error);
