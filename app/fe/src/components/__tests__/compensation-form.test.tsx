import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CompensationForm } from '../calculator/compensation-form';

// Mock the form submission
const mockOnSubmit = jest.fn();
const mockOnPersonalize = jest.fn();
const mockIsLoading = false;
const mockIsPersonalizing = false;

describe('CompensationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields correctly', () => {
    render(
      <CompensationForm
        onSubmit={mockOnSubmit}
        onPersonalize={mockOnPersonalize}
        isLoading={mockIsLoading}
        isPersonalizing={mockIsPersonalizing}
        initialData={null}
      />
    );

    expect(screen.getByText('Compensation Details')).toBeInTheDocument();
    expect(screen.getByText('Base Compensation')).toBeInTheDocument();
    expect(screen.getByLabelText('Base Salary (Annual)')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(
      <CompensationForm
        onSubmit={mockOnSubmit}
        onPersonalize={mockOnPersonalize}
        isLoading={mockIsLoading}
        isPersonalizing={mockIsPersonalizing}
        initialData={null}
      />
    );

    const submitButton = screen.getByText('Calculate Compensation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  it('submits form with valid data', async () => {
    render(
      <CompensationForm
        onSubmit={mockOnSubmit}
        onPersonalize={mockOnPersonalize}
        isLoading={mockIsLoading}
        isPersonalizing={mockIsPersonalizing}
        initialData={null}
      />
    );

    const baseSalaryInput = screen.getByLabelText('Base Salary (Annual)');
    fireEvent.change(baseSalaryInput, { target: { value: '75000' } });

    const submitButton = screen.getByText('Calculate Compensation');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          baseSalary: 75000,
        })
      );
    });
  });

  it('shows loading state when calculating', () => {
    render(
      <CompensationForm
        onSubmit={mockOnSubmit}
        onPersonalize={mockOnPersonalize}
        isLoading={true}
        isPersonalizing={mockIsPersonalizing}
        initialData={null}
      />
    );

    expect(screen.getByText('Calculating...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('switches between sections correctly', () => {
    render(
      <CompensationForm
        onSubmit={mockOnSubmit}
        onPersonalize={mockOnPersonalize}
        isLoading={mockIsLoading}
        isPersonalizing={mockIsPersonalizing}
        initialData={null}
      />
    );

    const benefitsButton = screen.getByText('Benefits');
    fireEvent.click(benefitsButton);

    expect(screen.getByText('Benefits')).toBeInTheDocument();
    expect(screen.getByLabelText('Health Insurance')).toBeInTheDocument();
  });
});
