import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const inputData = await request.json();
    
    // For now, return mock data
    // In production, this would call the backend API
    const mockBreakdown = {
      currency: inputData.currency || 'USD',
      grossPay: inputData.baseSalary || 0,
      netPay: (inputData.baseSalary || 0) - ((inputData.commutingCost || 0) * 12),
      trueCostToCompany: (inputData.baseSalary || 0) + 
                        (inputData.performanceBonus || 0) + 
                        (inputData.healthInsurance || 0) + 
                        (inputData.retirement401k || 0) + 
                        (inputData.retirementMatch || 0),
      
      baseCompensation: {
        baseSalary: inputData.baseSalary || 0,
        performanceBonus: inputData.performanceBonus || 0,
        guaranteedIncrease: inputData.guaranteedIncrease || 0,
        subtotal: (inputData.baseSalary || 0) + (inputData.performanceBonus || 0) + (inputData.guaranteedIncrease || 0)
      },
      
      benefits: {
        healthInsurance: inputData.healthInsurance || 0,
        dentalInsurance: inputData.dentalInsurance || 0,
        visionInsurance: inputData.visionInsurance || 0,
        lifeInsurance: inputData.lifeInsurance || 0,
        disabilityInsurance: inputData.disabilityInsurance || 0,
        retirement401k: inputData.retirement401k || 0,
        retirementMatch: inputData.retirementMatch || 0,
        otherBenefits: inputData.otherBenefits || 0,
        subtotal: (inputData.healthInsurance || 0) + 
                  (inputData.dentalInsurance || 0) + 
                  (inputData.visionInsurance || 0) + 
                  (inputData.lifeInsurance || 0) + 
                  (inputData.disabilityInsurance || 0) + 
                  (inputData.retirement401k || 0) + 
                  (inputData.retirementMatch || 0) + 
                  (inputData.otherBenefits || 0)
      },
      
      governmentBenefits: {
        socialSecurity: inputData.socialSecurity || 0,
        medicare: inputData.medicare || 0,
        unemploymentInsurance: inputData.unemploymentInsurance || 0,
        workersCompensation: inputData.workersCompensation || 0,
        subtotal: (inputData.socialSecurity || 0) + 
                  (inputData.medicare || 0) + 
                  (inputData.unemploymentInsurance || 0) + 
                  (inputData.workersCompensation || 0)
      },
      
      realLifeCosts: {
        commutingCost: (inputData.commutingCost || 0) * 12,
        parkingCost: (inputData.parkingCost || 0) * 12,
        fuelCost: (inputData.fuelCost || 0) * 12,
        foodCost: (inputData.foodCost || 0) * 12,
        utilitiesCost: (inputData.utilitiesCost || 0) * 12,
        extraHoursCost: (inputData.extraHoursCost || 0) * 12,
        subtotal: ((inputData.commutingCost || 0) + 
                  (inputData.parkingCost || 0) + 
                  (inputData.fuelCost || 0) + 
                  (inputData.foodCost || 0) + 
                  (inputData.utilitiesCost || 0) + 
                  (inputData.extraHoursCost || 0)) * 12
      },
      
      additionalFactors: {
        riskFactor: inputData.riskFactor || 0,
        upkeepCost: inputData.upkeepCost || 0,
        subtotal: (inputData.riskFactor || 0) + (inputData.upkeepCost || 0)
      },
      
      totalDeductions: ((inputData.commutingCost || 0) + 
                       (inputData.parkingCost || 0) + 
                       (inputData.fuelCost || 0) + 
                       (inputData.foodCost || 0) + 
                       (inputData.utilitiesCost || 0) + 
                       (inputData.extraHoursCost || 0)) * 12 + 
                       (inputData.riskFactor || 0) + 
                       (inputData.upkeepCost || 0),
      
      netVsGrossDifference: ((inputData.commutingCost || 0) + 
                            (inputData.parkingCost || 0) + 
                            (inputData.fuelCost || 0) + 
                            (inputData.foodCost || 0) + 
                            (inputData.utilitiesCost || 0) + 
                            (inputData.extraHoursCost || 0)) * 12 + 
                            (inputData.riskFactor || 0) + 
                            (inputData.upkeepCost || 0),
      
      percentageBreakdown: {
        baseCompensation: 0,
        benefits: 0,
        governmentBenefits: 0,
        realLifeCosts: 0,
        additionalFactors: 0
      }
    };

    // Calculate percentage breakdown
    const totalValue = mockBreakdown.trueCostToCompany;
    if (totalValue > 0) {
      mockBreakdown.percentageBreakdown = {
        baseCompensation: (mockBreakdown.baseCompensation.subtotal / totalValue) * 100,
        benefits: (mockBreakdown.benefits.subtotal / totalValue) * 100,
        governmentBenefits: (mockBreakdown.governmentBenefits.subtotal / totalValue) * 100,
        realLifeCosts: (mockBreakdown.realLifeCosts.subtotal / totalValue) * 100,
        additionalFactors: (mockBreakdown.additionalFactors.subtotal / totalValue) * 100
      };
    }

    return NextResponse.json({
      success: true,
      breakdown: mockBreakdown
    });
  } catch (error) {
    console.error('Calculation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to calculate compensation' 
      },
      { status: 500 }
    );
  }
}
