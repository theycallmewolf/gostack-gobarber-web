import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../../pages/ResetPassword';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();
const mockedApiResponse = jest.fn();

jest.mock('../../services/api', () => ({
  post() {
    return {
      response: mockedApiResponse,
    };
  },
}));

jest.mock('react-router-dom', () => ({
  useLocation() {
    return {
      search: 'token=mocked-token',
    };
  },
  useHistory: () => ({
    push: jest.fn(mockedHistoryPush),
  }),
}));

jest.mock('../../hooks/ToastContext', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

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

  it("shouldn't be able to recover the password if inserted password don't match", async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova Password');
    const passwordConfirmField = getByPlaceholderText('Confirmar Password');
    const buttonElement = getByText('Recuperar');

    fireEvent.change(passwordField, {
      target: { value: 'fancy-new-password' },
    });
    fireEvent.change(passwordConfirmField, {
      target: { value: 'different-password' },
    });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });
});
