import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';

const voteData = [
  { region: 'North', partyA: 45000, partyB: 32000, partyC: 18000 },
  { region: 'South', partyA: 38000, partyB: 41000, partyC: 22000 },
  { region: 'East', partyA: 52000, partyB: 28000, partyC: 15000 },
  { region: 'West', partyA: 41000, partyB: 39000, partyC: 24000 },
  { region: 'Central', partyA: 48000, partyB: 35000, partyC: 20000 },
];

export default function AnalystDashboard() {
  const [modalContent, setModalContent] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const openModal = (action) => {
    let content = '';
    switch (action) {
      case 'report':
        content = (
          <div>
            <h3>Generate Report</h3>
            <select style={{ width: '100%', padding: '1rem', margin: '1rem 0' }}>
              <option>Regional Summary</option>
              <option>Turnout Analysis</option>
            </select>
            <button 
              className="btn-primary"
              onClick={() => {
                setModalContent(null);
                setSuccessMessage('Report Generated Successfully!');
                setTimeout(() => setSuccessMessage(null), 4000);
              }}
            >
              Generate PDF
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
        <h2>Data Analyst Dashboard</h2>
        <div className="dashboard-grid side-by-side">
          <div className="dash-card">
            <h3>Vote Distribution by Region</h3>
            <ResponsiveContainer width="100%" height={450}>
              <AreaChart data={voteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="partyA" stackId="1" stroke="#1a3b5d" fill="#1a3b5d" />
                <Area type="monotone" dataKey="partyB" stackId="1" stroke="#e74c3c" fill="#e74c3c" />
                <Area type="monotone" dataKey="partyC" stackId="1" stroke="#3498db" fill="#3498db" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="dash-card">
            <h3>Analyst Tools</h3>
            <div className="quick-actions-list">
              <button className="action-btn" onClick={() => openModal('report')}>
                📄 Generate Reports
              </button>
              <button className="action-btn">
                📈 Advanced Visualization
              </button>
              <button className="action-btn">
                🔍 Trend Analysis
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