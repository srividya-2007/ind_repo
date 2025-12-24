import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navbar from '../components/Navbar';

const userData = [
  { name: 'Citizens', value: 4500 },
  { name: 'Observers', value: 1200 },
  { name: 'Analysts', value: 300 },
  { name: 'Admins', value: 50 },
];

const activityData = [
  { day: 'Mon', reports: 120, logins: 800 },
  { day: 'Tue', reports: 180, logins: 950 },
  { day: 'Wed', reports: 150, logins: 870 },
  { day: 'Thu', reports: 200, logins: 1100 },
  { day: 'Fri', reports: 220, logins: 1200 },
  { day: 'Sat', reports: 90, logins: 600 },
  { day: 'Sun', reports: 70, logins: 450 },
];

const COLORS = ['#1a3b5d', '#3498db', '#e74c3c', '#2ecc71'];

export default function AdminDashboard() {
  const [modalContent, setModalContent] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const openModal = (action) => {
    let content = '';
    switch (action) {
      case 'manage-users':
        content = (
          <div>
            <h3>Manage Users</h3>
            <p>Total Users: 5,050</p>
            <p>Active Today: 3,421</p>
          </div>
        );
        break;
      case 'security':
        content = (
          <div>
            <h3>Platform Security</h3>
            <p>🔒 Encryption: Enabled</p>
            <p>🛡️ 2FA Enforcement: Active</p>
            <button 
              className="btn-primary"
              onClick={() => {
                setModalContent(null);
                setSuccessMessage('Security Scan Completed!');
                setTimeout(() => setSuccessMessage(null), 4000);
              }}
            >
              Run Security Scan
            </button>
          </div>
        );
        break;
      case 'logs':
        content = (
          <div>
            <h3>System Logs</h3>
            <p>Last Backup: 2 hours ago</p>
            <button 
              className="btn-primary"
              onClick={() => {
                setModalContent(null);
                setSuccessMessage('Logs Downloaded!');
                setTimeout(() => setSuccessMessage(null), 4000);
              }}
            >
              Download Logs
            </button>
          </div>
        );
        break;
      default:
        content = <p>Coming soon</p>;
    }
    setModalContent(content);
  };

  const closeModal = () => setModalContent(null);

  return (
    <>
      <div className="dashboard-container">
        <h2>Admin Dashboard</h2>
        <div className="dashboard-grid side-by-side">
          <div className="dash-card">
            <h3>User Distribution</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie data={userData} cx="50%" cy="50%" outerRadius={120} dataKey="value" label>
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="dash-card">
            <h3>Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reports" fill="#e74c3c" />
                <Bar dataKey="logins" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dash-card">
            <h3>Admin Actions</h3>
            <div className="quick-actions-list">
              <button className="action-btn" onClick={() => openModal('manage-users')}>
                👥 Manage Users
              </button>
              <button className="action-btn" onClick={() => openModal('security')}>
                🔐 Platform Security
              </button>
              <button className="action-btn" onClick={() => openModal('logs')}>
                📜 View System Logs
              </button>
            </div>
          </div>
        </div>

        {modalContent && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              {modalContent}
            </div>
          </div>
        )}

        {successMessage && (
          <div className="success-toast">
            <span>✅ {successMessage}</span>
            <button onClick={() => setSuccessMessage(null)} className="toast-close">×</button>
          </div>
        )}
      </div>
    </>
  );
}