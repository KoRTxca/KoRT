import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Loading } from './components/Loading';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Join } from './pages/Join';
import { DigitalDollars } from './pages/DigitalDollars';
import { Profile } from './pages/Profile';
import { Advocate } from './pages/Advocate';
import { Detox } from './pages/Detox';
import { Dispatch } from './pages/Dispatch';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Auth />} />
        <Route path="/join" element={<Join />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/digital-dollars"
          element={
            <ProtectedRoute>
              <DigitalDollars />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/advocate"
          element={
            <ProtectedRoute>
              <Advocate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detox"
          element={
            <ProtectedRoute>
              <Detox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dispatch"
          element={
            <ProtectedRoute>
              <Dispatch />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
