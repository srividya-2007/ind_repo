import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Demo users for testing
    const demoUsers = {
      'admin@example.com': { name: 'Admin User', role: 'Admin' },
      'citizen@example.com': { name: 'John Citizen', role: 'Citizen' },
      'observer@example.com': { name: 'Lanka Observer', role: 'Election Observer' },
      'analyst@example.com': { name: 'Alex Analyst', role: 'Data Analyst' },
    };

    if (demoUsers[email] && password === 'password') {
      login({ email, ...demoUsers[email] });
      navigate('/dashboard');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Sign In</button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        <p className="note">
          
        </p>
      </div>
    </div>
  );
}