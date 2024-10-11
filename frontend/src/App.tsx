import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from '../../pages/home/index';
import AuthPage from '../../pages/auth/login';
import ForgotPasswordPage from '../../pages/auth/forgot-password';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import JobBrowser from './components/JobBrowser';
import Profile from './components/Profile';

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
