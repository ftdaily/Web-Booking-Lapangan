import React, { useState, useEffect } from "react";
import api from '../../utils/api';
import { normalizeBookingList, formatCurrency } from '../../utils/bookings';
import { useToast } from '../../contexts/ToastContext';

const Dashboard = () => {
  const [stats] = useState({
    totalBookings: 156,
    totalRevenue: 8750000,
    activeCourts: 8,
    todayBookings: 12,
  });

  const [recentBookings, setRecentBookings] = useState([]);

  const [courtUsage] = useState([
    { court: "Lapangan Badminton A", usage: 85, bookings: 23 },
    { court: "Lapangan Badminton B", usage: 92, bookings: 27 },
    { court: "Lapangan Futsal Indoor", usage: 76, bookings: 18 },
    { court: "Lapangan Tennis", usage: 68, bookings: 15 },
  ]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-800",
        label: "Dikonfirmasi",
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Menunggu",
      },
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

  const { showToast } = useToast();

  useEffect(() => {
    const loadRecent = async () => {
      try {
        const { data } = await api.get('/bookings');
        const list = Array.isArray(data) ? data : (data?.data || []);
        setRecentBookings(normalizeBookingList(list).slice(0, 3));
      } catch (err) {
        console.warn('Failed to fetch recent bookings', err);
        showToast('Gagal memuat booking terbaru', 'error');
      }
    };
    loadRecent();
  }, []);

  // use formatCurrency from utils/bookings

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Admin
              </h1>
              <p className="text-gray-600">
                Selamat datang kembali! Berikut adalah ringkasan hari ini.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
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
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalBookings}
                </p>
                <p className="text-xs text-green-600">↗ 12% dari bulan lalu</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Pendapatan</p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(stats.totalRevenue)}
                </p>
                <p className="text-xs text-green-600">↗ 8% dari bulan lalu</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Lapangan Aktif</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.activeCourts}
                </p>
                <p className="text-xs text-blue-600">8 dari 10 lapangan</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-orange-600"
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
                <p className="text-sm text-gray-600">Booking Hari Ini</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.todayBookings}
                </p>
                <p className="text-xs text-green-600">↗ 3 dari kemarin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Booking Terbaru
                </h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Lihat Semua
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {booking.customer}
                      </h4>
                      <p className="text-sm text-gray-600">{booking.court}</p>
                      <p className="text-xs text-gray-500">
                        {booking.date} • {booking.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="mb-1">
                        {getStatusBadge(booking.status)}
                      </div>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(booking.amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Court Usage */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Penggunaan Lapangan
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {courtUsage.map((court, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {court.court}
                      </span>
                      <span className="text-sm text-gray-600">
                        {court.usage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${court.usage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        {court.bookings} booking bulan ini
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-center">
                <svg
                  className="w-8 h-8 text-blue-600 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="text-sm font-medium text-blue-600">
                  Tambah Booking
                </span>
              </div>
            </button>

            <button className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
              <div className="text-center">
                <svg
                  className="w-8 h-8 text-green-600 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="text-sm font-medium text-green-600">
                  Kelola Lapangan
                </span>
              </div>
            </button>

            <button className="flex items-center justify-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <div className="text-center">
                <svg
                  className="w-8 h-8 text-purple-600 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-sm font-medium text-purple-600">
                  Kelola User
                </span>
              </div>
            </button>

            <button className="flex items-center justify-center p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
              <div className="text-center">
                <svg
                  className="w-8 h-8 text-orange-600 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-orange-600">
                  Laporan
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
