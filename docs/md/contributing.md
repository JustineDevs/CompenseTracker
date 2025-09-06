# Contributing to CompenseTracker

Thank you for your interest in contributing to CompenseTracker! This document provides guidelines and information for contributors.

## Code of Conduct

This project adheres to a code of conduct that ensures a welcoming environment for all contributors. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites
- Node.js 18+
- Git
- A GitHub account
- Basic knowledge of React, TypeScript, and Node.js

### Development Setup

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/CompenseTracker.git
   cd CompenseTracker
   ```

2. **Set Up Development Environment**
   ```bash
   # Install frontend dependencies
   cd app/fe
   npm install
   
   # Install backend dependencies
   cd ../be
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   # Copy environment files
   cp app/fe/env.example app/fe/.env.local
   cp app/be/env.example app/be/.env
   
   # Edit with your configuration
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd app/be
   npm run dev
   
   # Terminal 2 - Frontend
   cd app/fe
   npm run dev
   ```

## Development Guidelines

### Code Standards

We follow the guidelines outlined in `rules/Expert.md` and `rules/rules.mdc`:

- **Clean Code Principles**: Write readable, maintainable code
- **TypeScript**: Use TypeScript for type safety
- **ESLint/Prettier**: Follow configured linting and formatting rules
- **Testing**: Write tests for new features and bug fixes
- **Documentation**: Update documentation for new features

### Git Workflow

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make Your Changes**
   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new compensation calculation feature"
   ```

4. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   # Create PR on GitHub
   ```

### Commit Message Format

We use conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```bash
feat: add AI-powered email generation
fix: resolve calculation accuracy issue
docs: update API documentation
test: add unit tests for compensation service
```

## Project Structure

### Frontend (`app/fe/`)
```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Base UI components
│   ├── forms/          # Form components
│   └── calculator/     # Calculator-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── store/              # State management
├── types/              # TypeScript definitions
└── utils/              # Helper functions
```

### Backend (`app/be/`)
```
src/
├── routes/             # API routes
├── services/           # Business logic
├── middleware/         # Express middleware
├── utils/              # Utility functions
└── __tests__/          # Test files
```

## Testing

### Frontend Testing
```bash
cd app/fe
npm test                 # Run all tests
npm run test:coverage    # Run with coverage
npm run test:watch       # Watch mode
```

### Backend Testing
```bash
cd app/be
npm test                 # Run all tests
npm run test:coverage    # Run with coverage
```

### Writing Tests

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints and data flow
- **E2E Tests**: Test complete user workflows (future)

Example test structure:
```typescript
describe('CompensationService', () => {
  describe('calculateCompensation', () => {
    it('should calculate compensation correctly', () => {
      // Test implementation
    });
  });
});
```

## Pull Request Process

### Before Submitting

1. **Run Tests**: Ensure all tests pass
   ```bash
   npm test
   ```

2. **Run Linting**: Fix any linting issues
   ```bash
   npm run lint
   npm run lint:fix
   ```

3. **Check TypeScript**: Ensure no type errors
   ```bash
   npm run type-check
   ```

4. **Update Documentation**: Update relevant documentation

### Pull Request Template

When creating a PR, include:

- **Description**: What changes were made and why
- **Type**: Feature, bug fix, documentation, etc.
- **Testing**: How the changes were tested
- **Breaking Changes**: Any breaking changes (if applicable)
- **Screenshots**: For UI changes

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: At least one maintainer reviews the code
3. **Testing**: Changes are tested in staging environment
4. **Approval**: Maintainer approves and merges the PR

## Issue Guidelines

### Reporting Bugs

When reporting bugs, include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to reproduce
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If applicable

### Feature Requests

For feature requests, include:

- **Description**: Clear description of the feature
- **Use Case**: Why this feature would be useful
- **Proposed Solution**: How you envision it working
- **Alternatives**: Other solutions you've considered

## Development Areas

### High Priority
- **Performance Optimization**: Improve calculation speed and UI responsiveness
- **AI Integration**: Enhance AI-powered features and insights
- **Mobile Experience**: Improve mobile UI and functionality
- **Testing Coverage**: Increase test coverage for critical components

### Medium Priority
- **Internationalization**: Multi-language support
- **Advanced Analytics**: More detailed reporting and insights
- **API Improvements**: Enhanced API endpoints and documentation
- **Accessibility**: Improve accessibility compliance

### Low Priority
- **Theme System**: Customizable UI themes
- **Plugin System**: Extensible architecture for custom features
- **Advanced Integrations**: More third-party service integrations

## Code Review Guidelines

### For Contributors
- **Be Responsive**: Respond to review feedback promptly
- **Be Open**: Accept constructive criticism and suggestions
- **Be Thorough**: Test your changes thoroughly before submitting

### For Reviewers
- **Be Constructive**: Provide helpful, specific feedback
- **Be Timely**: Review PRs within 48 hours when possible
- **Be Thorough**: Check code quality, functionality, and documentation

## Release Process

### Version Numbering
We use semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Schedule
- **Major Releases**: Quarterly
- **Minor Releases**: Monthly
- **Patch Releases**: As needed for critical bugs

## Community

### Getting Help
- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Discord**: For real-time chat and support

### Recognition
Contributors are recognized in:
- **README**: Contributor list
- **Release Notes**: Feature and fix acknowledgments
- **Thanks.dev**: Automated contributor recognition

## License

By contributing to CompenseTracker, you agree that your contributions will be licensed under the MIT License.

## Questions?

If you have questions about contributing, please:
1. Check existing issues and discussions
2. Create a new issue with the "question" label
3. Join our Discord community

Thank you for contributing to CompenseTracker! 🚀
