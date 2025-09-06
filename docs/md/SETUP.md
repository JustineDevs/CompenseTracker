# CompenseTracker Setup Guide

This guide will help you set up and run the CompenseTracker application locally.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Supabase account
- API keys for AI services (optional for development)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CompenseTracker
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Run the database schema:

```bash
# Copy the schema file to your Supabase SQL editor
cat app/be/supabase/schema.sql
```

### 3. Configure Environment Variables

#### Frontend (.env.local)
```bash
cd app/fe
cp env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Backend (.env)
```bash
cd app/be
cp env.example .env
```

Edit `.env`:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
MICROSOFT_COPILOT_API_KEY=your_microsoft_copilot_api_key
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
```

### 4. Install Dependencies

#### Frontend
```bash
cd app/fe
npm install
```

#### Backend
```bash
cd app/be
npm install
```

### 5. Run the Application

#### Development Mode

**Option 1: Run separately**
```bash
# Terminal 1 - Backend
cd app/be
npm run dev

# Terminal 2 - Frontend
cd app/fe
npm run dev
```

**Option 2: Using Docker**
```bash
# From project root
docker-compose up
```

#### Production Mode

```bash
# Build and start backend
cd app/be
npm run build
npm start

# Build and start frontend
cd app/fe
npm run build
npm start
```

## Project Structure

```
CompenseTracker/
├── app/
│   ├── fe/                 # Frontend (Next.js)
│   │   ├── src/
│   │   │   ├── app/        # Next.js app directory
│   │   │   ├── components/ # React components
│   │   │   ├── types/      # TypeScript types
│   │   │   └── utils/      # Utility functions
│   │   ├── public/         # Static assets
│   │   └── package.json
│   └── be/                 # Backend (Node.js)
│       ├── src/
│       │   ├── routes/     # API routes
│       │   ├── services/   # Business logic
│       │   ├── middleware/ # Express middleware
│       │   └── utils/      # Utility functions
│       ├── supabase/       # Database schema
│       └── package.json
├── docs/                   # Documentation
├── rules/                  # Development rules
└── README.md
```

## Available Scripts

### Frontend (app/fe)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage

### Backend (app/be)
- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run build` - Build TypeScript (if using)
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## API Endpoints

### Compensation Calculation
- `POST /api/calculate` - Calculate compensation breakdown
- `GET /api/calculate/templates` - Get calculation templates

### AI Services
- `POST /api/ai/email` - Generate AI-powered emails
- `POST /api/ai/insights` - Generate AI insights
- `POST /api/ai/analyze` - Comprehensive AI analysis

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token

### Profiles
- `GET /api/profiles` - Get user profiles
- `POST /api/profiles` - Create new profile
- `GET /api/profiles/:id` - Get specific profile
- `PUT /api/profiles/:id` - Update profile
- `DELETE /api/profiles/:id` - Delete profile

## Database Schema

The application uses Supabase with the following main tables:

- `compensation_profiles` - User compensation calculations
- `email_templates` - Saved email templates
- `user_profiles` - User profile information

## Testing

### Frontend Tests
```bash
cd app/fe
npm test
npm run test:coverage
```

### Backend Tests
```bash
cd app/be
npm test
```

## Deployment

### Vercel (Recommended)

#### Frontend
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Backend
1. Deploy to Vercel as serverless functions
2. Set environment variables
3. Configure API routes

### Docker
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify your Supabase URL and keys
   - Check if RLS policies are properly set up

2. **CORS Issues**
   - Ensure FRONTEND_URL is correctly set in backend
   - Check CORS configuration in backend

3. **AI Service Errors**
   - Verify API keys are correctly set
   - Check rate limits and quotas

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all environment variables are set

### Logs

- Frontend logs: Browser console
- Backend logs: Check console output or log files in `app/be/logs/`

## Contributing

1. Follow the coding standards in `rules/Expert.md`
2. Write tests for new features
3. Update documentation as needed
4. Submit pull requests for review

## Support

For issues and questions:
- Check the troubleshooting section
- Review the documentation
- Create an issue in the repository

## License

This project is licensed under the MIT License.