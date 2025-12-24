import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';

const fairnessData = [
  { criteria: 'Transparency', score: 88 },
  { criteria: 'Access', score: 92 },
  { criteria: 'Security', score: 85 },
  { criteria: 'Counting', score: 90 },
  { criteria: 'Reporting', score: 87 },
  { criteria: 'Participation', score: 93 },
];

export default function ObserverDashboard() {
  const [modalContent, setModalContent] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const openModal = (action) => {
    let content = '';
    switch (action) {
      case 'report':
        content = (
          <div>
            <h3>Report Anomaly</h3>
            <textarea placeholder="Details..." rows="5" style={{ width: '100%', padding: '1rem', borderRadius: '8px' }}></textarea>
            <button 
              className="btn-primary"
              onClick={() => {
                setModalContent(null);
                setSuccessMessage('Anomaly Report Submitted!');
                setTimeout(() => setSuccessMessage(null), 4000);
              }}
            >
              Submit Report
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
        <h2>Election Observer Dashboard</h2>
        <div className="dashboard-grid side-by-side">
          <div className="dash-card">
            <h3>Election Fairness Metrics</h3>
            <ResponsiveContainer width="100%" height={500}>
              <RadarChart data={fairnessData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="criteria" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Current Election" dataKey="score" stroke="#1a3b5d" fill="#3498db" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="dash-card">
            <h3>Observer Actions</h3>
            <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>12 anomalies reported today</p>
            <p style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>98% resolved</p>
            <div className="quick-actions-list">
              <button className="action-btn" onClick={() => openModal('report')}>
                ⚠️ Report Anomaly
              </button>
              <button className="action-btn">
                📊 View Detailed Insights
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