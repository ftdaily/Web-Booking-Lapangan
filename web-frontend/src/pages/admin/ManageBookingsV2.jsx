import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { normalizeBookingList, formatCurrency } from '../../utils/bookings';
import { useToast } from '../../contexts/ToastContext';

const ManageBookingsV2 = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const { showToast } = useToast();
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        const { data } = await api.get('/bookings');
        const list = Array.isArray(data) ? data : (data?.data || []);
        setBookings(normalizeBookingList(list));
      } catch (err) {
        console.warn('Failed to load bookings', err);
        setFetchError(err);
        showToast('Gagal memuat booking admin', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Dikonfirmasi' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Menunggu' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Selesai' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Dibatalkan' },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>{config.label}</span>
    );
  };

  // use formatCurrency from utils if needed (still defined here as fallback)

  const formatDateTime = (value) => {
    if (!value) return "";
    try {
      const d = new Date(value);
      return d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    } catch (err) {
      return value;
    }
  };

  const retryLoad = async () => {
    try {
      setFetchError(null);
      setLoading(true);
      const { data } = await api.get('/bookings');
      const list = Array.isArray(data) ? data : (data?.data || []);
      setBookings(normalizeBookingList(list));
      showToast('Berhasil memuat booking', 'info');
    } catch (err) {
      setFetchError(err);
      showToast('Gagal memuat booking lagi', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await api.patch(`/bookings/${bookingId}`, { status: newStatus });
      setBookings((prev) => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.warn('Failed to update booking status', err);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus booking ini?')) return;
    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings((prev) => prev.filter(b => b.id !== bookingId));
    } catch (err) {
      console.warn('Failed to delete booking', err);
      setBookings((prev) => prev.filter(b => b.id !== bookingId));
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = filterStatus === "" || booking.status === filterStatus;
    const matchesSearch = searchTerm === "" || booking.customer?.toLowerCase().includes(searchTerm.toLowerCase()) || booking.bookingCode?.toLowerCase().includes(searchTerm.toLowerCase()) || booking.court?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate === "" || booking.date === selectedDate;
    return matchesStatus && matchesSearch && matchesDate;
  });

  const getActionButtons = (booking) => {
    const actions = [];
    if (booking.status === 'pending') {
      actions.push(<button key="confirm" onClick={() => handleStatusChange(booking.id, 'confirmed')} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Konfirmasi</button>);
      actions.push(<button key="cancel" onClick={() => handleStatusChange(booking.id, 'cancelled')} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Tolak</button>);
    }
    if (booking.status === 'confirmed') {
      actions.push(<button key="complete" onClick={() => handleStatusChange(booking.id, 'completed')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Selesai</button>);
    }
    actions.push(<button key="delete" onClick={() => handleDeleteBooking(booking.id)} className="bg-gray-500 text-white px-3 py-1 rounded text-sm">Hapus</button>);
    return actions;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold">Kelola Booking</h1>
              <p className="text-gray-600">Pantau dan kelola semua booking lapangan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full border px-3 py-2 rounded">
                <option value="">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="confirmed">Dikonfirmasi</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-full border px-3 py-2 rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cari</label>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Cari nama, kode, lapangan..." className="w-full border px-3 py-2 rounded" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {fetchError && (
            <div className="p-4 bg-red-50 text-center">
              <div className="mb-2 text-red-700">Gagal memuat daftar booking.</div>
              <div>
                <button onClick={retryLoad} className="px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
              </div>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Booking Info</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Lapangan & Waktu</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.bookingCode}</div>
                        <div className="text-sm text-gray-500">{formatDateTime(booking.createdAt)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.court}</div>
                        <div className="text-sm text-gray-500">{booking.date} • {booking.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(booking.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{formatCurrency(booking.amount)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-2">{getActionButtons(booking)}</div>
                        <button onClick={() => { const newStatus = prompt('Status baru (pending, confirmed, cancelled, completed)', booking.status); if (newStatus) handleStatusChange(booking.id, newStatus); }} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Tidak ada booking ditemukan</h3>
              <p className="text-gray-600">Coba ubah filter atau tambah booking baru</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookingsV2;
