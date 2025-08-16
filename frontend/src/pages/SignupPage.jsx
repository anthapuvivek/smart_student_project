// src/pages/SignupPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/Authcontext.jsx';

export default function SignupPage() {
  const { signup } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'teacher' });
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(form);
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border rounded p-6">
      <h1 className="text-2xl mb-4">Sign up</h1>
      {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" className="w-full border p-2 rounded" placeholder="Full name"
               value={form.name} onChange={onChange} />
        <input name="email" className="w-full border p-2 rounded" placeholder="Email"
               value={form.email} onChange={onChange} />
        <input name="password" type="password" className="w-full border p-2 rounded"
               placeholder="Password" value={form.password} onChange={onChange} />
        <select name="role" className="w-full border p-2 rounded" value={form.role} onChange={onChange}>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
        </select>
        <button className="w-full p-2 border rounded">Create account</button>
      </form>
    </div>
  );
}
