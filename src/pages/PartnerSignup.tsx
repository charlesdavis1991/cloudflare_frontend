import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PartnerSignup: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/partner/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error((data && data.error) || 'Signup failed');
      localStorage.setItem('partner_jwt', data.token);
      navigate('/settings');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-700">
        <h1 className="text-2xl font-bold text-white mb-6">Partner Signup</h1>
        <div className="mb-4">
          <label className="block text-slate-200 mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="mb-4">
          <label className="block text-slate-200 mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="mb-6">
          <label className="block text-slate-200 mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700 focus:ring-2 focus:ring-blue-500" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        {error && <div className="mt-4 text-red-400">{error}</div>}
      </form>
    </div>
  );
};

export default PartnerSignup; 