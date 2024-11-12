import React, { FC, PropsWithChildren } from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { render } from './test-utils';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import * as useLoadingModule from './hooks/useLoading';

// Mock all lazy-loaded components
jest.mock('./pages/landing-page', () => () => <div>Landing Page</div>);
jest.mock('./pages/auth-page', () => () => <div>Auth Page</div>);
jest.mock('./pages/forgot-password-page', () => () => <div>Forgot Password Page</div>);
jest.mock('./pages/Dashboard', () => () => (
  <div>
    <h2>Application Statistics</h2>
    <nav role="navigation">Sidebar Nav</nav>
    <h2>Upcoming Interviews</h2>
  </div>
));
jest.mock('./pages/Chat', () => () => <div>Chat</div>);
jest.mock('./pages/JobBrowser', () => () => <div>Job Browser</div>);
jest.mock('./pages/Profile', () => () => <div>Profile</div>);
jest.mock('./components/ScrollToTopButton', () => () => <div>Scroll To Top</div>);
jest.mock('./components/Loader', () => () => <div role="progressbar">Loading...</div>);

jest.spyOn(useLoadingModule, 'useLoading').mockImplementation(() => {
  return false; // Always return not loading for tests
});

// Increase Jest timeout for this test file
jest.setTimeout(10000);

beforeEach(() => {
  jest.clearAllMocks();
  // Mock window.matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test('renders dashboard page', async () => {
  const TestRouterProvider: FC<PropsWithChildren> = ({ children }) => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={children} />
      </Routes>
    </BrowserRouter>
  );

  render(<App RouterProvider={TestRouterProvider} />);

  // Test main dashboard elements
  expect(screen.getByText(/Application Statistics/i)).toBeInTheDocument();
  expect(screen.getByText(/Upcoming Interviews/i)).toBeInTheDocument();
  expect(screen.getByRole('navigation')).toBeInTheDocument(); // Sidebar navigation
});
