import React from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

export default function App() {
  const { currentUser, isAdmin } = useAuth();

  // Show login if not authenticated
  if (!currentUser) {
    return <Login />;
  }

  // Show appropriate dashboard based on user role
  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}

