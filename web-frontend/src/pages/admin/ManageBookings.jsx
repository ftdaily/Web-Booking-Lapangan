import React, { useState } from "react";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      bookingCode: "BK001",
      customer: "Ahmad Rizki",
      phone: "081234567890",
      court: "Lapangan Badminton A",
      date: "2024-12-01",
      time: "14:00 - 15:00",
      status: "confirmed",
      amount: 50000,
      createdAt: "2024-11-25 10:30",
    },
    {
      id: 2,
      bookingCode: "BK002",
      customer: "Sari Dewi",
      phone: "081234567891",
      court: "Lapangan Futsal Indoor",
      date: "2024-11-30",
      time: "19:00 - 20:00",
      status: "pending",
      amount: 120000,
      createdAt: "2024-11-24 15:20",
    },
    {
      id: 3,
      bookingCode: "BK003",
      customer: "Budi Santoso",
      phone: "081234567892",
      court: "Lapangan Badminton B",
      date: "2024-11-28",
      time: "16:00 - 17:00",
      status: "completed",
      amount: 45000,
      createdAt: "2024-11-22 09:15",
    },
    {
      id: 4,
      bookingCode: "BK004",
      customer: "Maya Sari",
      phone: "081234567893",
      court: "Lapangan Tennis",
      date: "2024-12-02",
      time: "08:00 - 09:00",
      status: "cancelled",
      amount: 75000,
      createdAt: "2024-11-26 14:45",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const handleDeleteBooking = (bookingId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      filterStatus === "" || booking.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.court.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate === "" || booking.date === selectedDate;

    return matchesStatus && matchesSearch && matchesDate;
  });

  const getActionButtons = (booking) => {
    const actions = [];

    if (booking.status === "pending") {
      actions.push(
        <button
          key="confirm"
          onClick={() => handleStatusChange(booking.id, "confirmed")}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
        >
          Konfirmasi
        </button>
      );
      actions.push(
        <button
          key="cancel"
          onClick={() => handleStatusChange(booking.id, "cancelled")}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
        >
          Tolak
        </button>
      );
    }

    if (booking.status === "confirmed") {
      actions.push(
        <button
          key="complete"
          onClick={() => handleStatusChange(booking.id, "completed")}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
        >
          Selesai
        </button>
      );
    }

    actions.push(
      <button
        key="delete"
        onClick={() => handleDeleteBooking(booking.id)}
        className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
      >
        Hapus
      </button>
    );

    return actions;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Kelola Booking
              </h1>
              <p className="text-gray-600">
                Pantau dan kelola semua booking lapangan
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Export Data
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Tambah Booking
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
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
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.length}
                </p>
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
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter((b) => b.status === "pending").length}
                </p>
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
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter((b) => b.status === "confirmed").length}
                </p>
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
                <p className="text-sm text-gray-600">Total Pendapatan</p>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(
                    bookings.reduce(
                      (total, booking) =>
                        booking.status !== "cancelled"
                          ? total + booking.amount
                          : total,
                      0
                    )
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="confirmed">Dikonfirmasi</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari
              </label>
              <input
                type="text"
                placeholder="Cari nama, kode booking, atau lapangan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Booking Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lapangan & Waktu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.bookingCode}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.createdAt}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.court}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.date} • {booking.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {formatCurrency(booking.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {getActionButtons(booking)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
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
                Tidak ada booking ditemukan
              </h3>
              <p className="text-gray-600">
                Coba ubah filter atau tambah booking baru
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
