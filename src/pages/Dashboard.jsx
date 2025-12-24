import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import CitizenDashboard from './CitizenDashboard';
import ObserverDashboard from './ObserverDashboard';
import AnalystDashboard from './AnalystDashboard';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  switch (user.role) {
    case 'Admin':
      return <AdminDashboard />;
    case 'Citizen':
      return <CitizenDashboard />;
    case 'Election Observer':
      return <ObserverDashboard />;
    case 'Data Analyst':
      return <AnalystDashboard />;
    default:
      return <Navigate to="/" />;
  }
}