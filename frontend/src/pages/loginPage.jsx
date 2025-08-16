
// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../context/Authcontext.jsx';

export default function LoginPage() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded p-6">
      <h1 className="text-2xl mb-4">Login</h1>
      {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email"
               value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password"
               value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={loading} className="w-full p-2 border rounded">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="text-sm mt-3">
        No account? <Link to="/signup" className="underline">Sign up</Link>
      </p>
    </div>
  );
}
