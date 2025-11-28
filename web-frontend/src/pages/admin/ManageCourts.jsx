import React, { useState } from "react";

const ManageCourts = () => {
  const [courts, setCourts] = useState([
    {
      id: 1,
      name: "Lapangan Badminton A",
      type: "Badminton",
      location: "Lantai 2, Gedung Olahraga",
      capacity: 4,
      status: "active",
      pricePerHour: 50000,
      facilities: ["AC", "Shower", "Parking", "Sound System"],
      image:
        "https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/01/Ukuran-Lapangan-Bulu-Tangkis.jpg",
      totalBookings: 45,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Lapangan Badminton B",
      type: "Badminton",
      location: "Lantai 2, Gedung Olahraga",
      capacity: 4,
      status: "active",
      pricePerHour: 45000,
      facilities: ["AC", "Shower", "Parking"],
      image:
        "https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/01/Ukuran-Lapangan-Bulu-Tangkis.jpg",
      totalBookings: 38,
      rating: 4.6,
    },
    {
      id: 3,
      name: "Lapangan Futsal Indoor",
      type: "Futsal",
      location: "Lantai 1, Gedung Olahraga",
      capacity: 12,
      status: "maintenance",
      pricePerHour: 120000,
      facilities: ["AC", "Shower", "Parking", "Sound System", "Scoreboard"],
      image:
        "https://asset.kompas.com/crops/Fp5rK6HQ-w9h3E_H-k5xqUEjhJY=/0x0:740x493/750x500/data/photo/2020/06/10/5ee07e6e2b0fb.jpg",
      totalBookings: 62,
      rating: 4.9,
    },
    {
      id: 4,
      name: "Lapangan Tennis",
      type: "Tennis",
      location: "Outdoor Area",
      capacity: 4,
      status: "inactive",
      pricePerHour: 75000,
      facilities: ["Parking", "Storage"],
      image:
        "https://via.placeholder.com/400x300/4ade80/ffffff?text=Tennis+Court",
      totalBookings: 12,
      rating: 4.2,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCourt, setEditingCourt] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    capacity: "",
    pricePerHour: "",
    facilities: [],
    image: "",
  });

  const courtTypes = [
    "Badminton",
    "Futsal",
    "Tennis",
    "Basketball",
    "Volleyball",
  ];
  const availableFacilities = [
    "AC",
    "Shower",
    "Parking",
    "Sound System",
    "Scoreboard",
    "Storage",
    "WiFi",
    "Locker",
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: "bg-green-100", text: "text-green-800", label: "Aktif" },
      maintenance: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        label: "Maintenance",
      },
      inactive: {
        bg: "bg-red-100",
        text: "text-red-800",
        label: "Tidak Aktif",
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

  const handleAddCourt = () => {
    setEditingCourt(null);
    setFormData({
      name: "",
      type: "",
      location: "",
      capacity: "",
      pricePerHour: "",
      facilities: [],
      image: "",
    });
    setShowModal(true);
  };

  const handleEditCourt = (court) => {
    setEditingCourt(court);
    setFormData({
      name: court.name,
      type: court.type,
      location: court.location,
      capacity: court.capacity.toString(),
      pricePerHour: court.pricePerHour.toString(),
      facilities: court.facilities,
      image: court.image,
    });
    setShowModal(true);
  };

  const handleDeleteCourt = (courtId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus lapangan ini?")) {
      setCourts(courts.filter((court) => court.id !== courtId));
    }
  };

  const handleStatusChange = (courtId, newStatus) => {
    setCourts(
      courts.map((court) =>
        court.id === courtId ? { ...court, status: newStatus } : court
      )
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const courtData = {
      ...formData,
      capacity: parseInt(formData.capacity),
      pricePerHour: parseInt(formData.pricePerHour),
      status: "active",
      totalBookings: 0,
      rating: 0,
    };

    if (editingCourt) {
      setCourts(
        courts.map((court) =>
          court.id === editingCourt.id ? { ...court, ...courtData } : court
        )
      );
    } else {
      setCourts([...courts, { ...courtData, id: Date.now() }]);
    }

    setShowModal(false);
  };

  const handleFacilityChange = (facility) => {
    const updatedFacilities = formData.facilities.includes(facility)
      ? formData.facilities.filter((f) => f !== facility)
      : [...formData.facilities, facility];

    setFormData({ ...formData, facilities: updatedFacilities });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Kelola Lapangan
              </h1>
              <p className="text-gray-600">
                Atur dan pantau semua lapangan olahraga
              </p>
            </div>
            <button
              onClick={handleAddCourt}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tambah Lapangan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Lapangan</p>
                <p className="text-2xl font-bold text-gray-800">
                  {courts.length}
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
                <p className="text-sm text-gray-600">Aktif</p>
                <p className="text-2xl font-bold text-gray-800">
                  {courts.filter((court) => court.status === "active").length}
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 15.5C3.544 16.333 4.506 18 6.046 18z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-gray-800">
                  {
                    courts.filter((court) => court.status === "maintenance")
                      .length
                  }
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Booking</p>
                <p className="text-2xl font-bold text-gray-800">
                  {courts.reduce(
                    (total, court) => total + court.totalBookings,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={court.image}
                alt={court.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {court.name}
                    </h3>
                    <p className="text-sm text-gray-600">{court.type}</p>
                  </div>
                  {getStatusBadge(court.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {court.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Kapasitas: {court.capacity} orang
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    {formatCurrency(court.pricePerHour)}/jam
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {court.facilities.slice(0, 3).map((facility, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {facility}
                      </span>
                    ))}
                    {court.facilities.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        +{court.facilities.length - 3} lagi
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">
                      {court.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {court.totalBookings} booking
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCourt(court)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>

                  {court.status === "active" ? (
                    <button
                      onClick={() =>
                        handleStatusChange(court.id, "maintenance")
                      }
                      className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded text-sm hover:bg-yellow-700 transition-colors"
                    >
                      Maintenance
                    </button>
                  ) : court.status === "maintenance" ? (
                    <button
                      onClick={() => handleStatusChange(court.id, "active")}
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Aktifkan
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(court.id, "active")}
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Aktifkan
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteCourt(court.id)}
                    className="bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {editingCourt ? "Edit Lapangan" : "Tambah Lapangan"}
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lapangan
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipe Olahraga
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Pilih Tipe</option>
                      {courtTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kapasitas (orang)
                    </label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harga per Jam (Rp)
                    </label>
                    <input
                      type="number"
                      value={formData.pricePerHour}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricePerHour: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Gambar
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fasilitas
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableFacilities.map((facility) => (
                      <label key={facility} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.facilities.includes(facility)}
                          onChange={() => handleFacilityChange(facility)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          {facility}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingCourt ? "Update" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourts;
