export interface PersonalDetails {
  recipientName: string;
  recipientEmail: string;
  userName: string;
  userRole: string;
  companyName: string;
  personalNotes?: string;
  priorities?: string[];
}

export interface CompensationInput {
  // Currency preference
  currency: string; // Currency code (e.g., 'USD', 'EUR', 'GBP')
  
  // Base compensation
  baseSalary: number;
  performanceBonus: number;
  guaranteedIncrease: number;
  
  // Benefits
  healthInsurance: number;
  dentalInsurance: number;
  visionInsurance: number;
  lifeInsurance: number;
  disabilityInsurance: number;
  retirement401k: number;
  retirementMatch: number;
  
  // Government benefits
  socialSecurity: number;
  medicare: number;
  unemploymentInsurance: number;
  workersCompensation: number;
  
  // Real-life costs
  commutingCost: number;
  parkingCost: number;
  fuelCost: number;
  foodCost: number;
  utilitiesCost: number;
  extraHoursCost: number;
  
  // Additional factors
  riskFactor: number;
  upkeepCost: number;
  otherBenefits: number;
  
  // Performance highlights (optional)
  performanceHighlights?: string;
  
  // Personalization (optional)
  personalDetails?: PersonalDetails;
}

export interface CompensationBreakdown {
  // Currency used for this breakdown
  currency: string;
  
  grossPay: number;
  netPay: number;
  trueCostToCompany: number;
  
  // Detailed breakdown
  baseCompensation: {
    baseSalary: number;
    performanceBonus: number;
    guaranteedIncrease: number;
    subtotal: number;
  };
  
  benefits: {
    healthInsurance: number;
    dentalInsurance: number;
    visionInsurance: number;
    lifeInsurance: number;
    disabilityInsurance: number;
    retirement401k: number;
    retirementMatch: number;
    otherBenefits: number;
    subtotal: number;
  };
  
  governmentBenefits: {
    socialSecurity: number;
    medicare: number;
    unemploymentInsurance: number;
    workersCompensation: number;
    subtotal: number;
  };
  
  realLifeCosts: {
    commutingCost: number;
    parkingCost: number;
    fuelCost: number;
    foodCost: number;
    utilitiesCost: number;
    extraHoursCost: number;
    subtotal: number;
  };
  
  additionalFactors: {
    riskFactor: number;
    upkeepCost: number;
    subtotal: number;
  };
  
  // Summary
  totalDeductions: number;
  netVsGrossDifference: number;
  percentageBreakdown: {
    baseCompensation: number;
    benefits: number;
    governmentBenefits: number;
    realLifeCosts: number;
    additionalFactors: number;
  };
}

export interface AIInsights {
  optimizationTips: string[];
  marketComparison: {
    percentile: number;
    industryAverage: number;
    recommendation: string;
  };
  negotiationPoints: string[];
  careerAdvice: string[];
}

export interface EmailTemplate {
  id: string;
  title: string;
  content: string;
  type: 'negotiation' | 'review' | 'offer' | 'custom';
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  company?: string;
  position?: string;
  industry?: string;
  compensationProfiles: CompensationProfile[];
  emailTemplates: EmailTemplate[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CompensationProfile {
  id: string;
  userId: string;
  name: string;
  input: CompensationInput;
  breakdown: CompensationBreakdown;
  aiInsights?: AIInsights;
  createdAt: Date;
  updatedAt: Date;
}
