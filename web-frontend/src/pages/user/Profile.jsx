import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

export default function Profile() {
  const { user, refresh } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setForm({ name: user.name || '', phone: user.phone || '', password: '' });
  }, [user]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name: form.name, phone: form.phone };
      if (form.password) payload.password = form.password;
      await api.put('/auth/me', payload);
      alert('Profile berhasil diperbarui');
      await refresh();
      setForm(prev => ({ ...prev, password: '' }));
    } catch (err) {
      console.error('Update profile error', err);
      alert(err?.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow my-32">
      <h2 className="text-xl font-semibold mb-4">Profil Saya</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="mt-1 w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password Baru</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} className="mt-1 w-full border px-3 py-2 rounded" placeholder="Kosong untuk tidak mengubah" />
        </div>
        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
        </div>
      </form>
    </div>
  );
}
