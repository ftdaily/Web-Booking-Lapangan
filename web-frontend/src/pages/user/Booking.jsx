import React, { useState, useEffect, useRef } from "react";
import api from "../../utils/api";
import { normalizeBookingList, formatCurrency, bookingCodeFromId, formatDate } from '../../utils/bookings';
import { useToast } from '../../contexts/ToastContext';
import QrModal from '../../components/QrModal';

const Booking = () => {
  
  const [bookings, setBookings] = useState([]);
  const [qr, setQr] = useState({ open: false, orderId: null, bookingId: null, message: '' });
  const pollIntervalRef = useRef(null);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  

  

  

  

  

  

  

  

  
  

  useEffect(() => {
    // Try to fetch bookings from backend and normalize them for the UI
    const loadBookings = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        const res = await api.get('/bookings', { params: { page, limit } });
        const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        const total = res.data?.total || 0;
        const totalP = res.data?.totalPages || (total ? Math.ceil(total / limit) : 1);
        setTotal(total);
        setTotalPages(totalP);
        setBookings(normalizeBookingList(list));
      } catch (err) {
        console.warn('Failed to fetch bookings from backend', err);
        setFetchError(err);
        showToast('Gagal memuat booking. Tekan Retry untuk mencoba lagi', 'error');
      }
    };
    loadBookings();
  }, [page]);

  // If totalPages shrinks below current page, clamp to last page
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  const totalBookings = bookings.length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const totalRevenue = bookings.reduce((s, b) => s + (Number(b.amount) || 0), 0);
  const activeCourts = new Set(bookings.map((b) => b.courtName)).size;
  const todayDate = new Date().toISOString().slice(0, 10);
  const todayBookings = bookings.filter((b) => b.date === todayDate).length;
  const stats = { totalBookings, confirmedCount, pendingCount, totalRevenue, activeCourts, todayBookings };

  const handleCancel = async (bookingId) => {
    try {
      await api.patch(`/bookings/${bookingId}`, { status: 'cancelled' });
      setBookings((prev) => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      console.warn('Failed to cancel booking via backend', err);
      // fallback to local state
      setBookings((prev) => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
    }
  }

  const handleEdit = (bookingId) => {
    // simple inline edit via prompts: allow change start and end time date
    const newDate = prompt('Tanggal baru (YYYY-MM-DD) - kosong untuk tidak mengubah');
    const newStart = prompt('Waktu mulai baru (HH:MM) - kosong untuk tidak mengubah');
    const newEnd = prompt('Waktu selesai baru (HH:MM) - kosong untuk tidak mengubah');
    if (!newDate && !newStart && !newEnd) return;
    const payload = {};
    if (newDate) payload.booking_date = newDate;
    if (newStart) payload.start_time = newStart;
    if (newEnd) payload.end_time = newEnd;
    const update = async () => {
      try {
        await api.patch(`/bookings/${bookingId}`, payload);
        setBookings(prev => prev.map(b => {
          if (b.id !== bookingId) return b;
          const updated = { ...b };
          if (payload.booking_date) updated.date = payload.booking_date;
          if (payload.start_time || payload.end_time) updated.time = `${payload.start_time || (b.raw?.start_time || '')} - ${payload.end_time || (b.raw?.end_time || '')}`;
          // keep raw updated fields too
          updated.raw = { ...b.raw, ...payload };
          return updated;
        }));
        alert('Booking berhasil diperbarui');
      } catch (err) {
        console.warn('Failed to edit booking via backend', err);
        alert(err?.response?.data?.message || 'Gagal memperbarui booking');
      }
    };
    update();
  }

  const handleViewDetail = (bookingId) => {
    // navigate to booking detail page (if exists)
    // navigate(`/user/booking/${bookingId}`)
    alert(`Show detail for booking ${bookingId} - feature not implemented`);
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "LUNAS",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Dipesan",
      },
      completed: { bg: "bg-blue-100", text: "text-blue-800", label: "Selesai" },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Dibatalkan",
      },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getActionButton = (status, bookingId) => {
    switch (status) {
      case "pending":
        return (
          <div className="flex gap-2">
            <button onClick={() => handleCancel(bookingId)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors">
              Batalkan
            </button>
            <button onClick={() => handleEdit(bookingId)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
              Edit
            </button>
            <button onClick={() => handlePay(bookingId)} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors">
              Bayar
            </button>
          </div>
        );
      case "confirmed":
        return (
          <button onClick={() => handleViewDetail(bookingId)} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors">
            Lihat Detail
          </button>
        );
      case "completed":
        return (
          <button className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors">
            Review
          </button>
        );
      default:
        return null;
    }
  };

  // create payment and show QR modal
  const handlePay = async (bookingId) => {
    try {
      const { data } = await api.post(`/payments/${bookingId}/create`);
      const orderId = data?.order_id || data?.orderId || null;
      if (!orderId) {
        showToast('Tidak dapat membuat pembayaran', 'error');
        return;
      }
      setQr({ open: true, orderId, bookingId, message: 'Scan QR untuk melanjutkan pembayaran (Simulated)' });
      // Poll booking status every 2s until confirmed
      let elapsed = 0;
      const interval = setInterval(async () => {
        elapsed += 2000;
        try {
          const { data: booking } = await api.get(`/bookings/${bookingId}`);
          const status = booking?.status;
          if (status === 'confirmed' || status === 'completed') {
            setQr({ open: false, orderId: null, bookingId: null, message: '' });
            clearInterval(interval);
            pollIntervalRef.current = null;
            // refresh booking list
            const res = await api.get('/bookings', { params: { page, limit } });
            const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
            setBookings(normalizeBookingList(list));
            showToast('Pembayaran terdeteksi - booking telah lunas', 'info');
          }
        } catch (err) {
          console.warn('Error polling booking status', err);
        }
        // Timeout after 2 minutes
        if (elapsed > 120000) {
          clearInterval(interval);
          showToast('Waktu pembayaran habis. Tutup QR dan coba lagi.', 'error');
        }
      }, 2000);
      pollIntervalRef.current = interval;
    } catch (err) {
      console.warn('Create payment failed', err);
      const status = err?.response?.status;
      if (status === 401) {
        showToast('Silakan login untuk melanjutkan pembayaran', 'error');
        // optionally redirect to login
        // window.location.href = '/auth/login';
        return;
      }
      if (status === 403) {
        showToast('Anda tidak berhak membayar booking ini', 'error');
        return;
      }
      showToast('Gagal membuat pembayaran', 'error');
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Riwayat Booking
          </h1>
          <p className="text-gray-600">
            Kelola dan pantau semua booking lapangan Anda
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Booking</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Dikonfirmasi</p>
                <p className="text-2xl font-bold text-gray-800">{stats.confirmedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Menunggu</p>
                <p className="text-2xl font-bold text-gray-800">{stats.pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Biaya</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Semua Status</option>
                <option value="confirmed">Dikonfirmasi</option>
                <option value="pending">Menunggu</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lapangan
              </label>
              <input
                type="text"
                placeholder="Cari lapangan..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors h-10">
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Booking List */}
        {fetchError && (
          <div className="mb-6 text-center p-4 bg-red-50 rounded">
            <div className="mb-2 text-red-700">Gagal memuat daftar booking.</div>
            <div>
              <button onClick={() => { setFetchError(null); (async () => {
                try { const res = await api.get('/bookings', { params: { page, limit } }); const list = Array.isArray(res.data) ? res.data : (res.data?.data || []); const total = res.data?.total || 0; const totalP = res.data?.totalPages || (total ? Math.ceil(total / limit) : 1); setTotal(total); setTotalPages(totalP); setBookings(normalizeBookingList(list)); showToast('Berhasil memuat ulang', 'info'); } catch (err) { setFetchError(err); showToast('Gagal memuat booking lagi', 'error'); } })(); }} className="px-4 py-2 bg-blue-600 text-white rounded mr-2">Retry</button>
            </div>
          </div>
        )}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 mb-4 md:mb-0">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {booking.courtName || booking.court}
                      </h3>
                      {getStatusBadge(booking.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{booking.time || booking.time}</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        <span>Kode: {booking.bookingCode || bookingCodeFromId(booking.id)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:text-right">
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-blue-600">
                        {booking.price || formatCurrency(booking.amount)}
                      </span>
                    </div>
                    {getActionButton(booking.status, booking.id)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Belum Ada Booking
            </h3>
            <p className="text-gray-600 mb-6">
              Anda belum memiliki riwayat booking lapangan
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Booking Lapangan
            </button>
          </div>
        )}

        {/* QR Modal */}
        <QrModal open={qr.open} onClose={() => { setQr({ open: false, orderId: null, bookingId: null, message: '' }); if (pollIntervalRef.current) { clearInterval(pollIntervalRef.current); pollIntervalRef.current = null; } }} orderId={qr.orderId} message={qr.message} />

        {/* Pagination */}
        {total > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className={`px-3 py-2 text-sm font-medium ${page <= 1 ? 'text-gray-300 border border-gray-200' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'} rounded-md`}>
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-2 text-sm font-medium ${page === (i + 1) ? 'text-white bg-blue-600 border border-blue-600' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'} rounded-md`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className={`px-3 py-2 text-sm font-medium ${page >= totalPages ? 'text-gray-300 border border-gray-200' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'} rounded-md`}>
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
