-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (for user profiles and authentication data)
CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create compensation_profiles table
CREATE TABLE IF NOT EXISTS compensation_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    input_data JSONB NOT NULL,
    breakdown_data JSONB NOT NULL,
    ai_insights JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    template_type VARCHAR(50) NOT NULL CHECK (template_type IN ('negotiation', 'review', 'offer', 'custom')),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    company VARCHAR(100),
    position VARCHAR(100),
    industry VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_compensation_profiles_user_id ON compensation_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_compensation_profiles_created_at ON compensation_profiles(created_at);
CREATE INDEX IF NOT EXISTS idx_email_templates_user_id ON email_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_email_templates_template_type ON email_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_compensation_profiles_updated_at
    BEFORE UPDATE ON compensation_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
    BEFORE UPDATE ON email_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE compensation_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON users FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
    ON users FOR DELETE
    USING (auth.uid() = id);

-- Compensation profiles policies
CREATE POLICY "Users can view their own compensation profiles"
    ON compensation_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own compensation profiles"
    ON compensation_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own compensation profiles"
    ON compensation_profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own compensation profiles"
    ON compensation_profiles FOR DELETE
    USING (auth.uid() = user_id);

-- Email templates policies
CREATE POLICY "Users can view their own email templates"
    ON email_templates FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own email templates"
    ON email_templates FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own email templates"
    ON email_templates FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own email templates"
    ON email_templates FOR DELETE
    USING (auth.uid() = user_id);

-- User profiles policies
CREATE POLICY "Users can view their own profile"
    ON user_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile"
    ON user_profiles FOR DELETE
    USING (auth.uid() = user_id);

-- Create a function to insert user profile when new user signs up
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert user profile for the new user
    INSERT INTO users (id, email, first_name, last_name, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        NOW(),
        NOW()
    );
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically create user profile for new users
DROP TRIGGER IF EXISTS create_user_profile_trigger ON auth.users;
CREATE TRIGGER create_user_profile_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION create_user_profile();

-- Create a function to insert default email templates for new users
CREATE OR REPLACE FUNCTION create_default_email_templates()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert default email templates for the new user
    INSERT INTO email_templates (user_id, name, content, template_type, is_default) VALUES
        (NEW.id, 'Salary Negotiation', 
         'Subject: Compensation Discussion - Request for Review

Dear [Manager''s Name],

I hope this email finds you well. I wanted to schedule a time to discuss my compensation package and share some insights I''ve gathered about my current role and market value.

Based on my analysis of my total compensation package, I''ve identified several areas where I believe we can work together to ensure my package remains competitive and reflects my contributions to the team.

**Current Compensation Overview:**
• Base Salary: [Base Salary]
• Total Benefits Value: [Benefits Total]
• True Cost to Company: [True CTC]

**Key Points for Discussion:**
1. Market competitiveness of my current package
2. Performance-based compensation opportunities
3. Benefits optimization and additional perks
4. Career development and growth trajectory

I''ve prepared a detailed analysis that I''d be happy to share during our meeting. I believe this data-driven approach will help us have a productive conversation about my compensation.

Would you be available for a 30-minute meeting next week to discuss this? I''m flexible with timing and can work around your schedule.

Thank you for your time and consideration. I look forward to our discussion.

Best regards,
[Your Name]', 'negotiation', true),
        
        (NEW.id, 'Performance Review', 
         'Subject: Annual Performance Review - Compensation Discussion

Dear [Manager''s Name],

I hope you''re doing well. As we approach my annual performance review, I wanted to share some comprehensive analysis of my compensation package and discuss potential adjustments for the coming year.

**Performance Highlights:**
• [Insert your key achievements]
• [Insert metrics and results]
• [Insert any additional contributions]

**Compensation Analysis:**
I''ve conducted a thorough analysis of my current compensation package, which includes:

• Base Salary: [Base Salary]
• Performance Bonus: [Performance Bonus]
• Total Benefits: [Benefits Total]
• True Cost to Company: [True CTC]

**Areas for Discussion:**
1. Salary adjustment based on performance and market rates
2. Bonus structure optimization
3. Additional benefits or perks
4. Professional development opportunities

I believe my contributions over the past year warrant consideration for a compensation adjustment. I''ve prepared supporting documentation and market research to share during our review meeting.

I''m looking forward to our discussion and would appreciate the opportunity to present my case in detail.

Best regards,
[Your Name]', 'review', true),
        
        (NEW.id, 'Job Offer Response', 
         'Subject: Thank You for the Offer - Compensation Discussion

Dear [Hiring Manager''s Name],

Thank you for extending the offer for the [Position Title] role. I''m excited about the opportunity to join [Company Name] and contribute to the team''s success.

After careful consideration of the offer, I''d like to discuss the compensation package to ensure it aligns with my expectations and market value for this position.

**Current Offer Analysis:**
• Base Salary: [Base Salary]
• Benefits Package: [Benefits Total]
• Total Compensation: [True CTC]

**Areas for Discussion:**
1. Base salary adjustment to reflect market rates
2. Performance bonus structure and criteria
3. Benefits package details and additional perks
4. Professional development and growth opportunities
5. Work-life balance considerations

I''ve prepared a comprehensive analysis of comparable positions in the market, and I believe there''s room for discussion on several aspects of the compensation package.

I''m confident that we can reach a mutually beneficial agreement that reflects the value I''ll bring to the role while meeting the company''s compensation structure.

Would you be available for a brief call this week to discuss these points? I''m excited about the opportunity and eager to move forward once we align on the compensation details.

Thank you for your time and consideration.

Best regards,
[Your Name]', 'offer', true);
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically create default email templates for new users
DROP TRIGGER IF EXISTS create_default_email_templates_trigger ON auth.users;
CREATE TRIGGER create_default_email_templates_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION create_default_email_templates();

-- Verification queries
-- Check if users table exists and has correct structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- Test the setup
SELECT 'Schema updated successfully!' as status;
