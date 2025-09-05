# CompenseTracker

<div align="center">

**AI-Powered True Compensation Calculator**

*Transparent, detailed compensation calculation with AI-enhanced insights and personalized email generation*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-1.0-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

## Overview

CompenseTracker is an advanced compensation calculator that provides transparent, detailed analysis of true cost-to-company calculations. It integrates multiple AI services to deliver personalized insights and automated email generation for compensation discussions.

## Problem Statement

Many professionals struggle to understand their true compensation value due to:
- Fragmented compensation structures with hidden costs
- Lack of transparency in benefits and allowances
- Difficulty in contextualizing total compensation impact
- No integrated tool for comprehensive compensation analysis

## Solution

A modern, AI-powered platform that:
- Calculates true cost-to-company with detailed breakdowns
- Integrates real-life cost factors (commuting, living expenses)
- Generates personalized AI-driven insights and email summaries
- Provides secure data storage and user profile management

## Tech Stack

### Frontend
- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Bits** - UI component library
- **MagicUI** - Advanced UI components
- **Animejs** - Animation library
- **Smoothy** - Smooth scrolling
- **Zustand** - State management

### Backend
- **Node.js** - Server-side runtime
- **Supabase** - Database and authentication
- **Vercel** - Hosting and serverless functions

### AI Integration
- **OpenAI API** - Natural language processing
- **Google Gemini API** - Multimodal AI capabilities
- **DeepSeek** - Document-aware AI processing
- **Microsoft Copilot** - Productivity enhancements

## Features

### Core Functionality
- ✅ Detailed compensation breakdown (base salary, bonuses, benefits)
- ✅ Real-life cost analysis (commuting, parking, food, utilities)
- ✅ Government benefits calculation
- ✅ True cost-to-company vs gross pay comparison
- ✅ Interactive data visualization

### AI-Powered Features
- 🤖 Personalized email generation for compensation discussions
- 🤖 AI-driven tips for optimizing compensation packages
- 🤖 Multimodal document processing for insights
- 🤖 Intelligent assistance and productivity enhancements

### User Experience
- 🔐 Secure user authentication and data storage
- 📱 Responsive design for desktop and mobile
- 💾 Save and manage multiple compensation profiles
- 📊 Export detailed breakdown reports
- 🎨 Modern, accessible UI with smooth animations

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Services   │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   (OpenAI,      │
│   TypeScript    │    │   Supabase      │    │    Gemini,      │
│   Tailwind CSS  │    │   Vercel        │    │    DeepSeek)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- API keys for AI services

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/compensetracker.git
cd compensetracker
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Configure your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key
GOOGLE_GEMINI_API_KEY=your_gemini_key
DEEPSEEK_API_KEY=your_deepseek_key
MICROSOFT_COPILOT_API_KEY=your_copilot_key
```

5. Run the development server
```bash
npm run dev
```

## Project Structure

```
CompenseTracker/
├── app/
│   ├── fe/                 # Frontend (Next.js)
│   │   ├── components/     # React components
│   │   ├── pages/         # Next.js pages
│   │   ├── styles/        # Tailwind CSS styles
│   │   └── utils/         # Frontend utilities
│   └── be/                # Backend (Node.js)
│       ├── api/           # API routes
│       ├── lib/           # Backend utilities
│       ├── services/      # Business logic
│       └── types/         # TypeScript types
├── docs/                  # Documentation
├── rules/                 # Development rules
└── README.md
```

## Development Guidelines

This project follows clean code principles and best practices:

- **Single Responsibility Principle** - Each module has one clear purpose
- **DRY (Don't Repeat Yourself)** - Reusable components and functions
- **Type Safety** - Comprehensive TypeScript usage
- **Testing** - Unit and integration tests
- **Documentation** - Clear code comments and API documentation
- **Security** - Input validation and secure data handling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@compensetracker.com or join our Slack channel.

---

<div align="center">
  <strong>Built with ❤️ for transparent compensation</strong>
</div>
