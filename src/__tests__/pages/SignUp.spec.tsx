import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SignUp from '../../pages/SignUp';

const mockedHistoryPush = jest.fn();
const mockedApiRequest = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('../../services/api', () => ({
  post: () => mockedApiRequest,
}));

jest.mock('../../hooks/ToastContext', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('SignUp page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to register', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Palavra-Passe');
    const buttonElement = getByText('Registar');

    fireEvent.change(nameField, {
      target: { value: 'wolf' },
    });
    fireEvent.change(emailField, {
      target: { value: 'fake@theycallmewolf.com' },
    });
    fireEvent.change(passwordField, {
      target: { value: 'fake-password' },
    });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it("shouldn't be able to register with invalid credentials", async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Palavra-Passe');
    const buttonElement = getByText('Registar');

    fireEvent.change(nameField, {
      target: { value: 'wolf' },
    });
    fireEvent.change(emailField, {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(passwordField, {
      target: { value: 'fake-password' },
    });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error after register', async () => {
    mockedApiRequest.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Palavra-Passe');
    const buttonElement = getByText('Registar');

    fireEvent.change(nameField, {
      target: { value: 'wolf' },
    });
    fireEvent.change(emailField, {
      target: { value: 'fake@theycallmewolf.com' },
    });
    fireEvent.change(passwordField, {
      target: { value: 'fake-password' },
    });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
        }),
      );
    });
  });
});
