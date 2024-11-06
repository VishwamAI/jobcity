import React, { Suspense, lazy, FC, PropsWithChildren } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box, useColorMode } from "@chakra-ui/react";
import "./App.css";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Loader from "./components/Loader";
import { useLoading } from "./hooks/useLoading";

// Lazy load route components
const LandingPage = lazy(() => import("./pages/landing-page"));
const AuthPage = lazy(() => import("./pages/auth-page"));
const ForgotPasswordPage = lazy(() => import("./pages/forgot-password-page"));
const Dashboard = lazy(() => import("./pages/Dashboard")); // Import the Dashboard component
const Chat = lazy(() => import("./pages/Chat"));
const JobBrowser = lazy(() => import("./pages/JobBrowser"));
const Profile = lazy(() => import("./pages/Profile"));

interface AppContentProps {
  isLoading: boolean;
  colorMode: string;
}

const AppContent: FC<AppContentProps> = ({ isLoading, colorMode }) => (
  <Box className="App" bg={colorMode === 'dark' ? 'gray.800' : 'white'}>
    {isLoading ? (
      <Loader />
    ) : (
      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/job-browser" element={<JobBrowser />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Suspense>
        <ScrollToTopButton />
      </>
    )}
  </Box>
);

interface AppProps {
  RouterProvider?: FC<PropsWithChildren>;
}

const App: FC<AppProps> = ({ RouterProvider = Router }) => {
  const isLoading = useLoading({ duration: 2500 });
  const { colorMode } = useColorMode();

  return (
    <RouterProvider>
      <AppContent isLoading={isLoading} colorMode={colorMode} />
    </RouterProvider>
  );
};

export default App;
