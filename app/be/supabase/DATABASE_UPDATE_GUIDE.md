# Database Update Guide

## Issue: "Database error saving new user"

The authentication system is trying to insert user data into a `users` table that doesn't exist in your Supabase database. Here's how to fix it:

## 🔧 Quick Fix

### Step 1: Open Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your CompenseTracker project

### Step 2: Open SQL Editor
1. Click on **SQL Editor** in the left sidebar
2. Click **New Query**

### Step 3: Run the Update Script
1. Copy the contents of `app/be/supabase/schema.sql`
2. Paste it into the SQL Editor
3. Click **Run** to execute the script

### Step 4: Verify the Update
After running the script, you should see:
- A `users` table created
- RLS policies enabled
- Triggers set up for automatic user profile creation

## 📋 What the Script Does

### 1. Creates Users Table
```sql
CREATE TABLE users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Enables Row Level Security
- Users can only access their own data
- Automatic data isolation per user

### 3. Sets Up Automatic User Creation
- When a user signs up via Google OAuth or email
- A profile is automatically created in the `users` table
- No manual intervention required

### 4. Creates Triggers
- `update_users_updated_at`: Updates timestamp on profile changes
- `create_user_profile_trigger`: Creates user profile on signup

## 🚀 After the Update

### Test Authentication
1. Go to your app at `localhost:3000`
2. Try signing up with Google OAuth
3. Try signing up with email
4. Both should work without database errors

### Check Database
1. Go to **Table Editor** in Supabase
2. Look for the `users` table
3. You should see user profiles being created automatically

## 🔍 Troubleshooting

### If the script fails:
1. **Check permissions**: Make sure you're using the service role key
2. **Check existing tables**: The script uses `IF NOT EXISTS` to avoid conflicts
3. **Check RLS**: Ensure Row Level Security is properly configured

### If authentication still fails:
1. **Check environment variables**: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
2. **Check Google OAuth**: Ensure Google OAuth is enabled in Supabase
3. **Check email settings**: Ensure email templates are configured

### If you see "relation does not exist":
1. The `users` table wasn't created
2. Re-run the SQL script
3. Check for any error messages in the SQL Editor

## 📊 Expected Database Structure

After the update, you should have:

### Tables:
- `users` - User profiles and authentication data
- `compensation_profiles` - User compensation calculations
- `email_templates` - Email templates for each user
- `user_profiles` - Additional user profile data

### Policies:
- All tables have RLS enabled
- Users can only access their own data
- Automatic profile creation on signup

### Triggers:
- Automatic user profile creation
- Timestamp updates on data changes
- Default email template creation

## ✅ Success Indicators

You'll know the update worked when:
1. ✅ No more "Database error saving new user" errors
2. ✅ Google OAuth sign-in works
3. ✅ Email sign-up works
4. ✅ User profiles appear in the `users` table
5. ✅ Authentication redirects work properly

## 🆘 Need Help?

If you're still having issues:
1. Check the Supabase logs in the dashboard
2. Verify your environment variables
3. Make sure Google OAuth is properly configured
4. Check that email templates are set up

The authentication system should work perfectly after this database update!
