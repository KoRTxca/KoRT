import React from 'react'
import { useLocation } from 'react-router-dom'

const PreviewGate = React.lazy(() => import('../../views/previewgate.jsx'));

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('kort_knight');
  const location = useLocation();
  
  if (!isAuth) {
    return (
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-amber-500 serif animate-pulse">Summoning Gate...</div>}>
        <PreviewGate attemptedRoute={location.pathname} />
      </React.Suspense>
    );
  }
  return children;
};

export default ProtectedRoute;
