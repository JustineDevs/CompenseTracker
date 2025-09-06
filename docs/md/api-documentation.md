# API Documentation

## Base URL
- **Development**: `http://localhost:3001/api`
- **Production**: `https://your-api-domain.com/api`

## Authentication

All API endpoints (except public ones) require authentication via JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details",
  "code": "ERROR_CODE"
}
```

## Compensation Calculation API

### Calculate Compensation
**POST** `/calculate`

Calculate detailed compensation breakdown based on input data.

#### Request Body
```json
{
  "baseSalary": 75000,
  "performanceBonus": 5000,
  "guaranteedIncrease": 3000,
  "healthInsurance": 12000,
  "dentalInsurance": 1200,
  "visionInsurance": 600,
  "lifeInsurance": 800,
  "disabilityInsurance": 400,
  "retirement401k": 6000,
  "retirementMatch": 3000,
  "socialSecurity": 4650,
  "medicare": 1088,
  "unemploymentInsurance": 420,
  "workersCompensation": 300,
  "commutingCost": 200,
  "parkingCost": 100,
  "fuelCost": 150,
  "foodCost": 300,
  "utilitiesCost": 200,
  "extraHoursCost": 100,
  "riskFactor": 1000,
  "upkeepCost": 500,
  "otherBenefits": 2000
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "breakdown": {
      "grossPay": 83000,
      "netPay": 78000,
      "trueCostToCompany": 105000,
      "baseCompensation": {
        "baseSalary": 75000,
        "performanceBonus": 5000,
        "guaranteedIncrease": 3000,
        "subtotal": 83000
      },
      "benefits": {
        "healthInsurance": 12000,
        "dentalInsurance": 1200,
        "visionInsurance": 600,
        "lifeInsurance": 800,
        "disabilityInsurance": 400,
        "retirement401k": 6000,
        "retirementMatch": 3000,
        "otherBenefits": 2000,
        "subtotal": 26000
      },
      "governmentBenefits": {
        "socialSecurity": 4650,
        "medicare": 1088,
        "unemploymentInsurance": 420,
        "workersCompensation": 300,
        "subtotal": 6458
      },
      "realLifeCosts": {
        "commutingCost": 2400,
        "parkingCost": 1200,
        "fuelCost": 1800,
        "foodCost": 3600,
        "utilitiesCost": 2400,
        "extraHoursCost": 1200,
        "subtotal": 12600
      },
      "additionalFactors": {
        "riskFactor": 1000,
        "upkeepCost": 500,
        "subtotal": 1500
      },
      "totalDeductions": 14100,
      "netVsGrossDifference": 5000,
      "percentageBreakdown": {
        "baseCompensation": 79.0,
        "benefits": 24.8,
        "governmentBenefits": 6.2,
        "realLifeCosts": 12.0,
        "additionalFactors": 1.4
      }
    },
    "calculatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Get Calculation Templates
**GET** `/calculate/templates`

Retrieve pre-built calculation templates for common job roles.

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "software-engineer",
      "name": "Software Engineer",
      "description": "Template for software engineering positions",
      "defaultValues": {
        "baseSalary": 120000,
        "performanceBonus": 15000,
        "healthInsurance": 12000,
        "retirement401k": 6000,
        "retirementMatch": 3000
      }
    }
  ]
}
```

## AI Services API

### Generate Email
**POST** `/ai/email`

Generate AI-powered email based on compensation data.

#### Request Body
```json
{
  "breakdown": {
    // Compensation breakdown object
  },
  "templateType": "negotiation",
  "customPrompt": "Optional custom prompt"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "content": "Generated email content...",
    "templateType": "negotiation",
    "generatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Generate Insights
**POST** `/ai/insights`

Generate AI-powered insights and recommendations.

#### Request Body
```json
{
  "breakdown": {
    // Compensation breakdown object
  }
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "insights": [
      {
        "type": "tip",
        "title": "Optimize Your 401k Contribution",
        "description": "Your 401k contribution is below recommended levels...",
        "priority": "high",
        "category": "retirement"
      }
    ],
    "generatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Comprehensive Analysis
**POST** `/ai/analyze`

Perform comprehensive AI analysis of compensation package.

#### Request Body
```json
{
  "breakdown": {
    // Compensation breakdown object
  },
  "analysisType": "comprehensive"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "analysis": {
      "insights": [...],
      "marketComparison": {
        "percentile": 75,
        "industryAverage": 95000,
        "recommendation": "Your compensation is above market average"
      },
      "negotiationPoints": [
        "Base salary adjustment based on market rates",
        "Performance bonus structure optimization"
      ],
      "careerAdvice": [
        "Focus on developing skills that increase market value",
        "Build a strong professional network"
      ],
      "summary": {
        "totalInsights": 5,
        "highPriorityItems": 2,
        "overallScore": 85
      }
    },
    "generatedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Authentication API

### Register User
**POST** `/auth/register`

Register a new user account.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "message": "Registration successful. Please check your email for verification."
  }
}
```

### Login User
**POST** `/auth/login`

Authenticate user and return JWT token.

#### Request Body
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "session": {
      "access_token": "jwt-token",
      "refresh_token": "refresh-token",
      "expires_at": 1642248000
    }
  }
}
```

### Get Current User
**GET** `/auth/me`

Get current authenticated user information.

#### Headers
```http
Authorization: Bearer <jwt-token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": "2024-01-01T00:00:00Z"
    }
  }
}
```

### Logout User
**POST** `/auth/logout`

Logout user and invalidate session.

#### Request Body
```json
{
  "refresh_token": "refresh-token"
}
```

#### Response
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## Profile Management API

### Get User Profiles
**GET** `/profiles`

Get all compensation profiles for the authenticated user.

#### Headers
```http
Authorization: Bearer <jwt-token>
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Software Engineer Profile",
      "input_data": {...},
      "breakdown_data": {...},
      "ai_insights": {...},
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### Create Profile
**POST** `/profiles`

Create a new compensation profile.

#### Headers
```http
Authorization: Bearer <jwt-token>
```

#### Request Body
```json
{
  "name": "New Profile",
  "input": {
    // Compensation input data
  },
  "breakdown": {
    // Compensation breakdown data
  },
  "aiInsights": {
    // Optional AI insights
  }
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Profile",
    "input_data": {...},
    "breakdown_data": {...},
    "ai_insights": {...},
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### Get Profile by ID
**GET** `/profiles/:id`

Get a specific compensation profile by ID.

#### Headers
```http
Authorization: Bearer <jwt-token>
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Profile Name",
    "input_data": {...},
    "breakdown_data": {...},
    "ai_insights": {...},
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### Update Profile
**PUT** `/profiles/:id`

Update an existing compensation profile.

#### Headers
```http
Authorization: Bearer <jwt-token>
```

#### Request Body
```json
{
  "name": "Updated Profile Name",
  "input": {
    // Updated input data
  },
  "breakdown": {
    // Updated breakdown data
  }
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Updated Profile Name",
    "input_data": {...},
    "breakdown_data": {...},
    "ai_insights": {...},
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T11:00:00Z"
  }
}
```

### Delete Profile
**DELETE** `/profiles/:id`

Delete a compensation profile.

#### Headers
```http
Authorization: Bearer <jwt-token>
```

#### Response
```json
{
  "success": true,
  "message": "Profile deleted successfully"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Input validation failed |
| `AUTHENTICATION_ERROR` | Invalid or missing authentication |
| `AUTHORIZATION_ERROR` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `AI_SERVICE_ERROR` | AI service unavailable or failed |
| `DATABASE_ERROR` | Database operation failed |
| `INTERNAL_ERROR` | Internal server error |

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **AI Endpoints**: 20 requests per hour per user
- **Authentication**: 10 requests per 15 minutes per IP

## Pagination

For endpoints that return lists, use query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `sort`: Sort field (default: created_at)
- `order`: Sort order (asc/desc, default: desc)

Example:
```http
GET /profiles?page=1&limit=10&sort=name&order=asc
```

## Webhooks

Webhook endpoints for real-time notifications:

- `POST /webhooks/profile-created` - Profile creation
- `POST /webhooks/profile-updated` - Profile updates
- `POST /webhooks/calculation-completed` - Calculation completion
