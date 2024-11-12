import React, { FC, PropsWithChildren } from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as useLoadingModule from './hooks/useLoading';

// Mock components
jest.mock('./pages/landing-page', () => ({
  default: () => <div>Landing Page</div>
}));

jest.mock('./pages/auth-page', () => ({
  default: () => <div>Auth Page</div>
}));

jest.mock('./pages/forgot-password-page', () => ({
  default: () => <div>Forgot Password Page</div>
}));

jest.mock('./pages/Dashboard', () => ({
  default: () => (
    <div>
      <h2>Application Statistics</h2>
      <nav role="navigation">Sidebar Nav</nav>
      <h2>Upcoming Interviews</h2>
    </div>
  )
}));

jest.mock('./pages/Chat', () => ({
  default: () => <div>Chat</div>
}));

jest.mock('./pages/JobBrowser', () => ({
  default: () => <div>Job Browser</div>
}));

jest.mock('./pages/Profile', () => ({
  default: () => <div>Profile</div>
}));

jest.mock('./components/ScrollToTopButton', () => ({
  default: () => <div>Scroll To Top</div>
}));

jest.mock('./components/Loader', () => ({
  default: () => <div role="progressbar">Loading...</div>
}));

// Mock useLoading hook
jest.spyOn(useLoadingModule, 'useLoading').mockReturnValue(false);

// Setup test environment
jest.setTimeout(10000);

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('App Component', () => {
  test('renders dashboard page', async () => {
    const TestRouter: FC<PropsWithChildren> = ({ children }) => (
      <BrowserRouter>{children}</BrowserRouter>
    );

    render(<App RouterProvider={TestRouter} />);

    expect(screen.getByText(/Application Statistics/i)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming Interviews/i)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
