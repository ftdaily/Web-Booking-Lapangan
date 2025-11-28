import React, { useState } from "react";
import { Link } from "react-router-dom";

const Field = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const venues = [
    {
      id: 1,
      name: "Lapangan Badminton A",
      type: "Badminton",
      price: 50000,
      priceDisplay: "Rp. 50,000 /jam",
      image:
        "https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/01/Ukuran-Lapangan-Bulu-Tangkis.jpg",
      location: "Lantai 2, Gedung Olahraga",
      rating: 4.8,
      facilities: ["AC", "Shower", "Parking"],
      available: true,
      capacity: 4,
    },
    {
      id: 2,
      name: "Lapangan Futsal Indoor",
      type: "Futsal",
      price: 120000,
      priceDisplay: "Rp. 120,000 /jam",
      image:
        "https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/01/Ukuran-Lapangan-Bulu-Tangkis.jpg",
      location: "Lantai 1, Gedung Olahraga",
      rating: 4.9,
      facilities: ["AC", "Shower", "Parking", "Sound System"],
      available: false,
      capacity: 12,
    },
    {
      id: 3,
      name: "Lapangan Tennis A",
      type: "Tennis",
      price: 75000,
      priceDisplay: "Rp. 75,000 /jam",
      image:
        "https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/01/Ukuran-Lapangan-Bulu-Tangkis.jpg",
      location: "Outdoor Area",
      rating: 4.3,
      facilities: ["Parking", "Storage"],
      available: true,
      capacity: 4,
    },
  ];

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
                    <span className="text-yellow-400">?</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {venue.rating}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">
                    ?? {venue.location}
                  </div>
                  <div className="text-sm text-gray-600">
                    ?? Kapasitas: {venue.capacity} orang
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
                      {venue.priceDisplay}
                    </span>
                  </div>
                  <Link
                    // to={`/user/details/${venue.id}`}
                    to={`/details`}
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
      </div>
    </div>
  );
};

export default Field;
