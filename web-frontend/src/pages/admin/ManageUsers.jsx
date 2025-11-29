import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('pending');
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: '', npm: '', email: '', phone: '', role: 'mahasiswa', is_active: 0, password: '' });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter === 'pending') params.is_active = 0;
      const { data } = await api.get('/users', { params });
      setUsers(data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err); 
      setError(err?.response?.data?.message || 'Gagal memuat pengguna');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const handleApprove = async (id) => {
    try {
      await api.patch(`/users/${id}/approve`);
      // remove user from list
      setUsers(prev => prev.filter(u => u.id !== id));
      alert('User berhasil disetujui.');
    } catch (err) {
      console.error('Error approving user:', err);
      alert(err?.response?.data?.message || 'Gagal menyetujui user.');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      alert('User berhasil ditolak dan dihapus.');
    } catch (err) {
      console.error('Error rejecting user:', err);
      alert(err?.response?.data?.message || 'Gagal menolak pengguna.');
    }
  };

  const openCreate = () => {
    setEditUser(null);
    setForm({ name: '', npm: '', email: '', phone: '', role: 'mahasiswa', is_active: 1, password: '' });
    setShowForm(true);
  };

  const openEdit = (user) => {
    setEditUser(user);
    setForm({ name: user.name, npm: user.npm, email: user.email, phone: user.phone, role: user.role, is_active: user.is_active, password: '' });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editUser) {
        // update
        const payload = { ...form };
        if (!payload.password) delete payload.password; // don't send empty password
        await api.put(`/users/${editUser.id}`, payload);
        alert('User berhasil diperbarui.');
      } else {
        // create
        const payload = { ...form };
        await api.post('/users', payload);
        alert('User berhasil dibuat.');
      }
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error('Error submit user form:', err);
      alert(err?.response?.data?.message || 'Gagal menyimpan pengguna.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Kelola Pengguna</h2>
      <p className="text-sm mb-4">Daftar akun yang menunggu persetujuan admin.</p>
      <div className="flex items-center justify-between mb-4">
        <div>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">{error}</div>
          )}
        </div>
        <div className="flex gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-2 py-1 border rounded">
            <option value="pending">Menunggu</option>
            <option value="all">Semua</option>
          </select>
          <button onClick={openCreate} className="bg-blue-600 text-white px-3 py-1 rounded">Tambah User</button>
        </div>
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          {showForm && (
            <form className="mb-4 p-4 border rounded bg-gray-50" onSubmit={handleFormSubmit}>
              <h3 className="text-lg font-semibold mb-3">{editUser ? 'Edit User' : 'Tambah User'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input name="name" placeholder="Nama" value={form.name} onChange={handleFormChange} className="px-3 py-2 border rounded" required />
                <input name="npm" placeholder="NPM" value={form.npm} onChange={handleFormChange} className="px-3 py-2 border rounded" />
                <input name="email" placeholder="Email" value={form.email} onChange={handleFormChange} className="px-3 py-2 border rounded" required />
                <input name="phone" placeholder="Nomor Telepon" value={form.phone} onChange={handleFormChange} className="px-3 py-2 border rounded" />
                <select name="role" value={form.role} onChange={handleFormChange} className="px-3 py-2 border rounded">
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="admin">Admin</option>
                </select>
                <label className="flex items-center gap-2"><input type="checkbox" name="is_active" checked={form.is_active === 1} onChange={handleFormChange} /> Aktif</label>
                <input name="password" placeholder="Password (kosong biar tidak berubah)" value={form.password} onChange={handleFormChange} className="px-3 py-2 border rounded" type="password" />
              </div>
              <div className="mt-3 flex gap-2">
                <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Simpan</button>
                <button type="button" onClick={() => { setShowForm(false); setEditUser(null); }} className="bg-gray-200 px-3 py-1 rounded">Batal</button>
              </div>
            </form>
          )}
          {users.length === 0 ? (
            <div className="text-sm text-gray-600">Tidak ada pengguna untuk disetujui.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">ID</th>
                  <th className="py-2">Nama</th>
                  <th className="py-2">NPM</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Nomor</th>
                  <th className="py-2">Aksi</th>
                </tr>
              </thead>
                  <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{u.id}</td>
                    <td className="py-2">{u.name}</td>
                    <td className="py-2">{u.npm}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2">{u.phone}</td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(u.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Setujui
                        </button>
                        <button
                          onClick={() => openEdit(u)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Apakah Anda yakin ingin menolak dan menghapus akun ini?')) {
                              handleReject(u.id);
                            }
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
