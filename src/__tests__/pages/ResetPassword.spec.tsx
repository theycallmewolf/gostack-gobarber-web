import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../../pages/ResetPassword';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedApiResponse = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(mockedHistoryPush),
  }),
  useLocation: () => ({
    search: () => ({
      replace: () => 'token',
    }),
  }),
}));

jest.mock('../../services/api', () => ({
  post: () => mockedApiResponse,
}));

jest.mock('../../hooks/ToastContext', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Reset Password page', () => {
  it('should be able to recover the password', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova Password');
    const passwordConfirmField = getByPlaceholderText('Confirmar Password');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(passwordField, {
      target: { value: 'fancy-new-password' },
    });
    fireEvent.change(passwordConfirmField, {
      target: { value: 'fancy-new-password' },
    });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });
});
