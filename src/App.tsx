import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";       // adjust path as needed
import Layout from "./components/Layout/Layout";               // global header / sidebar wrapper
import ErrorBoundary from "./components/ErrorBoundary";        // catches runtime errors
import ProtectedRoute from "./components/ProtectedRoute";      // guards private routes
import { AuthProvider } from "./contexts/AuthProvider";

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <ErrorBoundary>
        <Layout>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirect root → /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Fallback for unknown URLs */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </Router>
  </AuthProvider>
);

export default App;
