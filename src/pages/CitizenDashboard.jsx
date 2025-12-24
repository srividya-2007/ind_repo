import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';

const turnoutData = [
  { year: '2015', turnout: 68 },
  { year: '2018', turnout: 72 },
  { year: '2021', turnout: 75 },
  { year: '2024', turnout: 79 },
  { year: '2025', turnout: 82 },
];

export default function CitizenDashboard() {
  const [modalContent, setModalContent] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const openModal = (action) => {
    let content = '';
    switch (action) {
      case 'live-results':
        content = (
          <div>
            <h3>Live Election Results</h3>
            <p><strong>Party A:</strong> 45%</p>
            <p><strong>Party B:</strong> 38%</p>
            <p><strong>Party C:</strong> 17%</p>
          </div>
        );
        break;
      case 'report-issue':
        content = (
          <div>
            <h3>Report an Issue</h3>
            <textarea placeholder="Describe the issue..." rows="5" style={{ width: '100%', padding: '1rem', borderRadius: '8px' }}></textarea>
            <button 
              className="btn-primary"
              onClick={() => {
                setModalContent(null);
                setSuccessMessage('Issue Reported Successfully!');
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
        <h2>Citizen Dashboard</h2>
        <div className="dashboard-grid side-by-side">
          <div className="dash-card">
            <h3>Voter Turnout Trend (Last 5 Elections)</h3>
            <ResponsiveContainer width="100%" height={450}>
              <LineChart data={turnoutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="turnout" stroke="#1a3b5d" strokeWidth={5} dot={{ fill: '#e74c3c' }} />
              </LineChart>
            </ResponsiveContainer>
            <p style={{ marginTop: '2rem', fontSize: '1.4rem', color: '#2ecc71', textAlign: 'center' }}>
              Great job! Voter participation is increasing steadily.
            </p>
          </div>

          <div className="dash-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions-list">
              <button className="action-btn" onClick={() => openModal('live-results')}>
                📊 View Live Results
              </button>
              <button className="action-btn" onClick={() => openModal('report-issue')}>
                ⚠️ Report Issue
              </button>
              <button className="action-btn" onClick={() => openModal('discussion')}>
                💬 Join Discussion Forum
              </button>
              <button className="action-btn" onClick={() => openModal('education')}>
                📚 Voter Education
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