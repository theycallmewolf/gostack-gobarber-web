import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/AuthContext', () => {
  return {
    useAuth: () => ({
      signIn: jest.fn(),
    }),
  };
});

describe('SignIn page', () => {
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Palavra-Passe');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'fake@theycallmewolf.com' },
    });
    fireEvent.change(passwordField, {
      target: { value: 'fake-password' },
    });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});