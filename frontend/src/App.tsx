import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './landing-page';
import AuthPage from './auth-page';
import ForgotPasswordPage from './forgot-password-page';
import Dashboard from './Dashboard'; // Import the Dashboard component
import Chat from './Chat';
import JobBrowser from './JobBrowser';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add the Dashboard route */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/job-browser" element={<JobBrowser />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
