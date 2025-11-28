import React from "react";

const Home = () => {
  const featuredCourts = [
    {
      id: 1,
      name: "Lapangan Badminton A",
      image:
        "https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/01/Ukuran-Lapangan-Bulu-Tangkis.jpg",
      price: "Rp. 50,000 - 100,000",
      rating: 4.8,
      location: "Lantai 2, Gedung Olahraga",
      facilities: ["AC", "Shower", "Parking"],
    },
    {
      id: 2,
      name: "Lapangan Badminton B",
      image:
        "https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/01/Ukuran-Lapangan-Bulu-Tangkis.jpg",
      price: "Rp. 45,000 - 90,000",
      rating: 4.6,
      location: "Lantai 2, Gedung Olahraga",
      facilities: ["AC", "Shower", "Parking"],
    },
    {
      id: 3,
      name: "Lapangan Futsal Indoor",
      image:
        "https://asset.kompas.com/crops/Fp5rK6HQ-w9h3E_H-k5xqUEjhJY=/0x0:740x493/750x500/data/photo/2020/06/10/5ee07e6e2b0fb.jpg",
      price: "Rp. 80,000 - 150,000",
      rating: 4.9,
      location: "Lantai 1, Gedung Olahraga",
      facilities: ["AC", "Shower", "Parking", "Sound System"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Booking Lapangan Olahraga
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Temukan dan pesan lapangan olahraga terbaik untuk aktivitas Anda
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Lihat Lapangan
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Cara Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-lg text-gray-600">
              Kemudahan booking dengan fasilitas terlengkap
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              <h3 className="text-xl font-semibold mb-2">Booking Real-time</h3>
              <p className="text-gray-600">
                Sistem booking online yang mudah dan cepat dengan konfirmasi
                langsung
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
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
              <h3 className="text-xl font-semibold mb-2">Fasilitas Lengkap</h3>
              <p className="text-gray-600">
                Lapangan dengan fasilitas modern dan terawat untuk kenyamanan
                Anda
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
              <p className="text-gray-600">
                Nikmati berbagai pilihan paket dengan harga yang bersahabat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courts Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Lapangan Populer
            </h2>
            <p className="text-lg text-gray-600">
              Pilih lapangan terbaik untuk aktivitas olahraga Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourts.map((court) => (
              <div
                key={court.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={court.image}
                  alt={court.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {court.name}
                    </h3>
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
                  </div>

                  <p className="text-gray-600 text-sm mb-2">{court.location}</p>
                  <p className="text-lg font-bold text-blue-600 mb-4">
                    {court.price}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {court.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Lihat Semua Lapangan
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Memulai Olahraga Hari Ini?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Daftar sekarang dan dapatkan akses ke semua lapangan olahraga
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Daftar Sekarang
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
