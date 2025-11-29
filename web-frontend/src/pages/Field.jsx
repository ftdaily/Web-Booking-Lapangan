import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { useToast } from '../contexts/ToastContext';
import { formatCurrency } from '../utils/bookings';

const Field = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
    const { showToast } = useToast();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadVenues = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        const { data } = await api.get('/rooms', { params: { page, limit } });
        if (Array.isArray(data) || Array.isArray(data.data)) {
          const rows = Array.isArray(data) ? data : data.data;
            setVenues(rows.map(r => ({
            id: r.id,
            name: r.name,
            type: r.type || 'Badminton',
            price: r.price_per_hour || r.price || 50000,
            priceDisplay: r.price_per_hour ? `Rp. ${r.price_per_hour} /jam` : 'Rp. 50,000 /jam',
            image: r.image || 'https://via.placeholder.com/400x250',
            location: r.location || 'Gedung Olahraga',
            rating: r.rating || 4.6,
            facilities: r.facilities || ['AC', 'Shower'],
            available: r.is_active === 1,
            capacity: r.capacity || 4,
          })));
          }
          const total = data?.total || 0;
          setTotal(total);
          setTotalPages(total ? Math.ceil(total / limit) : 1);
      } catch (err) {
        console.warn('Failed to load rooms from backend', err);
        setFetchError(err);
        showToast('Gagal memuat lapangan; silakan Retry', 'error');
      }
      finally { setLoading(false); }
    }
    loadVenues();
  }, [page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

  const retryLoad = async () => {
    try {
      setFetchError(null);
      setLoading(true);
      const { data } = await api.get('/rooms', { params: { page, limit } });
      const rows = Array.isArray(data) ? data : data.data;
      setVenues(rows.map(r => ({
        id: r.id,
        name: r.name,
        type: r.type || 'Badminton',
        price: r.price_per_hour || r.price || 50000,
        priceDisplay: r.price_per_hour ? `Rp. ${r.price_per_hour} /jam` : 'Rp. 50,000 /jam',
        image: r.image || 'https://via.placeholder.com/400x250',
        location: r.location || 'Gedung Olahraga',
        rating: r.rating || 4.6,
        facilities: r.facilities || ['AC', 'Shower'],
        available: r.is_active === 1,
        capacity: r.capacity || 4,
      })));
      const total = data?.total || 0;
      setTotal(total);
      setTotalPages(total ? Math.ceil(total / limit) : 1);
      showToast('Berhasil memuat ulang lapangan', 'info');
    } catch (err) {
      setFetchError(err);
      showToast('Gagal memuat lapangan lagi', 'error');
    } finally {
      setLoading(false);
    }
  }

  const sportTypes = ["Semua", "Badminton", "Futsal", "Tennis", "Basketball"];
  const priceRanges = [
    { label: "Semua Harga", value: "" },
    { label: "< Rp. 50,000", value: "0-50000" },
    { label: "Rp. 50,000 - 100,000", value: "50000-100000" },
    { label: "> Rp. 100,000", value: "100000-999999" },
  ];

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch = venue.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "" ||
      selectedType === "Semua" ||
      venue.type === selectedType;

    let matchesPrice = true;
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      matchesPrice = venue.price >= min && venue.price <= max;
    }

    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Pilih Lapangan Olahraga</h1>
          <p className="text-xl text-blue-100">
            Temukan lapangan terbaik untuk aktivitas Anda
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Lapangan
              </label>
              <input
                type="text"
                placeholder="Nama lapangan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Olahraga
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                {sportTypes.map((type) => (
                  <option key={type} value={type === "Semua" ? "" : type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rentang Harga
              </label>
          
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("");
                  setPriceRange("");
                }}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              >
                Reset Filter
              </button>
            </div>
          </div>
          {fetchError && (
            <div className="mt-4 p-4 bg-red-50 text-center rounded">
              <div className="mb-2 text-red-700">Gagal memuat daftar lapangan.</div>
              <div>
                <button onClick={retryLoad} className="px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
              </div>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Menampilkan{" "}
            <span className="font-semibold">{filteredVenues.length}</span>{" "}
            lapangan tersedia
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      venue.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {venue.available ? "Tersedia" : "Sedang Digunakan"}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {venue.type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {venue.name}
                  </h3>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-sm text-gray-600">{venue.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">
                    {venue.location || 'Lokasi tidak tersedia'}
                  </div>
                  <div className="text-sm text-gray-600">
                    Kapasitas: {venue.capacity || '-'} orang
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {venue.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {facility}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(venue.price)}/jam
                    </span>
                  </div>
                  <Link
                    to={`/lapangan/${venue.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">
              Tidak ada lapangan ditemukan
            </div>
            <p className="text-gray-600">Coba ubah filter pencarian Anda</p>
          </div>
        )}
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

export default Field;
