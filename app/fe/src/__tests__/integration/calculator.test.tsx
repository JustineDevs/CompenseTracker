import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import CalculatorPage from '@/app/calculator/page';

// Mock the API calls
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

const mockBreakdown = {
  grossPay: 100000,
  netPay: 85000,
  trueCostToCompany: 120000,
  baseCompensation: {
    baseSalary: 100000,
    performanceBonus: 0,
    guaranteedIncrease: 0,
    subtotal: 100000
  },
  benefits: {
    healthInsurance: 12000,
    dentalInsurance: 2000,
    visionInsurance: 1000,
    lifeInsurance: 500,
    disabilityInsurance: 1000,
    retirement401k: 6000,
    retirementMatch: 3000,
    otherBenefits: 0,
    subtotal: 25500
  },
  governmentBenefits: {
    socialSecurity: 6200,
    medicare: 1450,
    unemploymentInsurance: 0,
    workersCompensation: 0,
    subtotal: 7650
  },
  realLifeCosts: {
    commutingCost: 2400,
    parkingCost: 1200,
    fuelCost: 1800,
    foodCost: 3600,
    utilitiesCost: 2400,
    extraHoursCost: 0,
    subtotal: 11400
  },
  additionalFactors: {
    riskFactor: 0,
    upkeepCost: 0,
    subtotal: 0
  },
  percentageBreakdown: {
    baseCompensation: 83.33,
    benefits: 21.25,
    governmentBenefits: 6.38,
    realLifeCosts: 9.5,
    additionalFactors: 0
  }
};

describe('Calculator Integration Tests', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('complete calculator workflow', async () => {
    // Mock successful API response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ breakdown: mockBreakdown })
    } as Response);

    render(<CalculatorPage />);

    // Step 1: Fill out the form
    const baseSalaryInput = screen.getByLabelText(/base salary/i);
    fireEvent.change(baseSalaryInput, { target: { value: '100000' } });

    const calculateButton = screen.getByRole('button', { name: /calculate compensation/i });
    fireEvent.click(calculateButton);

    // Wait for calculation to complete
    await waitFor(() => {
      expect(screen.getByText('Results')).toBeInTheDocument();
    });

    // Verify results are displayed
    expect(screen.getByText('$100,000')).toBeInTheDocument(); // Base salary
    expect(screen.getByText('$120,000')).toBeInTheDocument(); // True CTC

    // Step 2: Navigate to AI Insights
    const insightsButton = screen.getByRole('button', { name: /ai insights/i });
    fireEvent.click(insightsButton);

    await waitFor(() => {
      expect(screen.getByText('AI-Powered Insights')).toBeInTheDocument();
    });

    // Step 3: Navigate to Email Generation
    const emailButton = screen.getByRole('button', { name: /generate email/i });
    fireEvent.click(emailButton);

    await waitFor(() => {
      expect(screen.getByText('Generate Email')).toBeInTheDocument();
    });

    // Verify email generation options are available
    expect(screen.getByText('Salary Negotiation')).toBeInTheDocument();
    expect(screen.getByText('Performance Review')).toBeInTheDocument();
    expect(screen.getByText('Job Offer Response')).toBeInTheDocument();
    expect(screen.getByText('Custom Email')).toBeInTheDocument();
  });

  test('form validation prevents invalid submission', async () => {
    render(<CalculatorPage />);

    // Try to submit without filling required fields
    const calculateButton = screen.getByRole('button', { name: /calculate compensation/i });
    fireEvent.click(calculateButton);

    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/base salary is required/i)).toBeInTheDocument();
    });

    // API should not be called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('step navigation respects validation', async () => {
    render(<CalculatorPage />);

    // Try to navigate to results without calculation
    const resultsButton = screen.getByRole('button', { name: /results/i });
    fireEvent.click(resultsButton);

    // Should not navigate (button should be disabled)
    expect(resultsButton).toBeDisabled();
  });

  test('error handling for API failures', async () => {
    // Mock API failure
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error('API Error'));

    render(<CalculatorPage />);

    const baseSalaryInput = screen.getByLabelText(/base salary/i);
    fireEvent.change(baseSalaryInput, { target: { value: '100000' } });

    const calculateButton = screen.getByRole('button', { name: /calculate compensation/i });
    fireEvent.click(calculateButton);

    // Should handle error gracefully
    await waitFor(() => {
      expect(screen.getByText(/error calculating compensation/i)).toBeInTheDocument();
    });
  });

  test('personalization workflow', async () => {
    // Mock successful API response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ breakdown: mockBreakdown })
    } as Response);

    render(<CalculatorPage />);

    // Fill out personalization data
    const personalizeTab = screen.getByText(/personalize/i);
    fireEvent.click(personalizeTab);

    const recipientNameInput = screen.getByLabelText(/recipient name/i);
    fireEvent.change(recipientNameInput, { target: { value: 'John Smith' } });

    const userNameInput = screen.getByLabelText(/your name/i);
    fireEvent.change(userNameInput, { target: { value: 'Jane Doe' } });

    // Fill base salary
    const baseSalaryInput = screen.getByLabelText(/base salary/i);
    fireEvent.change(baseSalaryInput, { target: { value: '100000' } });

    // Click personalize button
    const personalizeButton = screen.getByRole('button', { name: /personalize email/i });
    fireEvent.click(personalizeButton);

    // Should navigate to email generation with personalization data
    await waitFor(() => {
      expect(screen.getByText('Generate Email')).toBeInTheDocument();
    });
  });
});
