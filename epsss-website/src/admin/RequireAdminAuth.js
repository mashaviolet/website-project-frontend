import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "./services/api";

const RequireAdminAuth = ({ children }) => {
  const location = useLocation();
  const [status, setStatus] = useState('checking'); // checking | authed | unauth

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await api.get('/auth/me');
        if (!cancelled) setStatus('authed');
      } catch (_) {
        if (!cancelled) setStatus('unauth');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (status === 'checking') {
    return null; // or a spinner
  }

  if (status === 'unauth') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAdminAuth;
