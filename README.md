<div align="center">

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

<div align="center">

## Documentation

| Documentation | Description |
|---------------|-------------|
| [![Setup Guide](https://img.shields.io/badge/Setup%20Guide-Complete-green?style=for-the-badge&logo=book)](docs/md/SETUP.md) | Complete setup and installation instructions |
| [![Features](https://img.shields.io/badge/Features-Detailed-blue?style=for-the-badge&logo=star)](docs/md/features.md) | Detailed feature list and capabilities |
| [![Tech Stack](https://img.shields.io/badge/Tech%20Stack-Overview-orange?style=for-the-badge&logo=code)](docs/md/tech-stack.md) | Complete technology stack overview |
| [![Architecture](https://img.shields.io/badge/Architecture-Design-purple?style=for-the-badge&logo=diagram)](docs/md/architecture.md) | System architecture and design patterns |
| [![API Docs](https://img.shields.io/badge/API%20Docs-Reference-red?style=for-the-badge&logo=api)](docs/md/api-documentation.md) | Complete API reference |
| [![Contributing](https://img.shields.io/badge/Contributing-Guidelines-yellow?style=for-the-badge&logo=github)](docs/md/contributing.md) | Guidelines for contributors |

</div>

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

## Getting Started

For detailed setup instructions, please see our [Setup Guide](docs/md/SETUP.md).

### Quick Start

1. Clone the repository
```bash
git clone https://github.com/yourusername/compensetracker.git
cd compensetracker
```

2. Install dependencies
```bash
# Frontend
cd app/fe && npm install

# Backend  
cd ../be && npm install
```

3. Configure environment variables (see [Setup Guide](docs/md/SETUP.md) for details)

4. Run the development servers
```bash
# Terminal 1 - Backend
cd app/be && npm run dev

# Terminal 2 - Frontend
cd app/fe && npm run dev
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
  
  [![Thanks.dev](https://img.shields.io/badge/Thanks.dev-JustineDevs-green?style=for-the-badge&logo=github)](https://thanks.dev/JustineDevs)

  [![Built with ❤️ for transparent compensation](https://img.shields.io/badge/Built-with-❤️-for-transparent-compensation-JustineDevs-red?style=for-the-badge&logo=github)

</div>
