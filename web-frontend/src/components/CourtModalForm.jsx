import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function CourtModalForm({ initialData, mode = 'add', onClose, onSaved }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    capacity: '',
    pricePerHour: '',
    facilities: [],
    image: '',
    status: 'active'
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || '',
        location: initialData.location || '',
        capacity: initialData.capacity ? initialData.capacity.toString() : '',
        pricePerHour: initialData.price_per_hour ? initialData.price_per_hour.toString() : '',
        facilities: initialData.facilities || [],
        image: initialData.image || '',
        status: initialData.is_active ? 'active' : 'inactive'
      });
    } else {
      setFormData({ name: '', type: '', location: '', capacity: '', pricePerHour: '', facilities: [], image: '', status: 'active' });
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const val = checked;
      if (name === 'facilities') {
        const list = formData.facilities.includes(value) ? formData.facilities.filter(f => f !== value) : [...formData.facilities, value];
        setFormData(prev => ({ ...prev, facilities: list }));
      } else {
        setFormData(prev => ({ ...prev, [name]: val }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      location: formData.location,
      description: formData.type || '',
      type: formData.type,
      capacity: formData.capacity ? parseInt(formData.capacity, 10) : null,
      price_per_hour: formData.pricePerHour ? parseFloat(formData.pricePerHour) : 0,
      is_active: formData.status === 'active' ? 1 : 0,
      image: formData.image || null,
      facilities: formData.facilities || []
    };
    try {
      if (mode === 'edit' && initialData && initialData.id) {
        await api.put(`/rooms/${initialData.id}`, payload);
      } else {
        await api.post('/rooms', payload);
      }
      onSaved && onSaved();
    } catch (err) {
      console.warn('Failed to save room', err);
      alert(err?.response?.data?.message || 'Gagal menyimpan lapangan');
    }
  }

  const availableFacilities = [
    'AC', 'Shower', 'Parking', 'Sound System', 'Scoreboard', 'Storage', 'WiFi', 'Locker'
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="name" placeholder="Nama Lapangan" value={formData.name} onChange={handleChange} className="px-3 py-2 border rounded" required />
        <select name="type" value={formData.type} onChange={handleChange} className="px-3 py-2 border rounded">
          <option value="">Pilih Tipe</option>
          <option value="Badminton">Badminton</option>
          <option value="Futsal">Futsal</option>
          <option value="Tennis">Tennis</option>
        </select>
        <input name="location" placeholder="Lokasi" value={formData.location} onChange={handleChange} className="px-3 py-2 border rounded" />
        <input name="capacity" value={formData.capacity} onChange={handleChange} className="px-3 py-2 border rounded" type="number" placeholder="Kapasitas" />
        <input name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} className="px-3 py-2 border rounded" type="number" placeholder="Harga per Jam (Rp)" />
        <input name="image" value={formData.image} onChange={handleChange} className="px-3 py-2 border rounded" placeholder="URL Gambar" />
        <div className="md:col-span-2">
          <div className="flex gap-3 flex-wrap">
            {availableFacilities.map((fac) => (
              <label key={fac} className="flex items-center gap-2">
                <input type="checkbox" name="facilities" value={fac} checked={formData.facilities.includes(fac)} onChange={handleChange} />
                <span className="text-sm">{fac}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2 justify-end">
        <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Batal</button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{mode === 'edit' ? 'Update' : 'Simpan'}</button>
      </div>
    </form>
  )
}
