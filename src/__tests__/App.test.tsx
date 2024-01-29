import App from '@/App';
import { ThemeProvider } from '@/context/ThemeContext';
import { calculateDeliveryFee } from '@/helpers/deliveryFee';
import { mockContext, setupFakeDate } from '@/helpers/tests';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';

jest.mock('@/helpers/deliveryFee');

mockContext();
setupFakeDate();

describe('App', () => {
  it('renders', () => {
    const component = TestRenderer.create(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(screen.getByText('Delivery fee calculator')).toBeInTheDocument();
    expect(screen.getByLabelText('Main content')).toBeInTheDocument();
    expect(screen.getByText('Order fee calculation form')).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const mockFee = 10;
    (calculateDeliveryFee as jest.Mock).mockReturnValue(mockFee);

    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    fireEvent.change(screen.getByLabelText('Cart value in euros'), {
      target: { value: '20' },
    });
    fireEvent.change(screen.getByLabelText('Delivery distance in meters'), {
      target: { value: '5' },
    });
    fireEvent.change(screen.getByLabelText('Amount of items in cart'), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByLabelText('Order time'), {
      target: { value: '01.01.2024 00:00' },
    });

    fireEvent.click(screen.getByText('Calculate delivery price'));

    expect(calculateDeliveryFee).toHaveBeenCalledWith(
      20,
      5,
      3,
      new Date('2024-01-01')
    );

    expect(screen.getByText(`€${mockFee}.00`)).toBeInTheDocument();
  });
});
