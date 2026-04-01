import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './src/context/AuthContext.jsx';
import LandingPage from './src/pages/LandingPage.jsx';
import LoginPage from './src/pages/LoginPage.jsx';
import DashboardPage from './src/pages/DashboardPage.jsx';
import BuilderPage from './src/pages/BuilderPage.jsx';
import Navbar from './src/components/Navbar.jsx';
import ProtectedRoute from './src/components/ProtectedRoute.jsx';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="loading-state" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/builder/:projectId"
          element={
            <ProtectedRoute>
              <Navbar />
              <BuilderPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;