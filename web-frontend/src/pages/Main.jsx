import React from "react";
import { Link } from "react-router-dom";

export const Main = () => {
  const features = [
    {
      icon: "🏸",
      title: "Lapangan Berkualitas",
      description:
        "Berbagai jenis lapangan olahraga dengan fasilitas terbaik dan terawat dengan baik",
    },
    {
      icon: "📱",
      title: "Booking Online",
      description:
        "Pesan lapangan kapan saja melalui platform online yang mudah dan praktis",
    },
    {
      icon: "💰",
      title: "Harga Terjangkau",
      description:
        "Dapatkan harga yang kompetitif dan berbagai promo menarik untuk setiap pemesanan",
    },
    {
      icon: "⏰",
      title: "Fleksibel",
      description:
        "Pilih waktu sesuai kebutuhan Anda dengan sistem slot waktu yang fleksibel",
    },
  ];

  const popularSports = [
    {
      name: "Badminton",
      image:
        "https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/01/Ukuran-Lapangan-Bulu-Tangkis.jpg",
      courts: "8 lapangan",
      price: "Mulai dari Rp 45.000/jam",
    },
    {
      name: "Futsal",
      image:
        "https://asset.kompas.com/crops/Fp5rK6HQ-w9h3E_H-k5xqUEjhJY=/0x0:740x493/750x500/data/photo/2020/06/10/5ee07e6e2b0fb.jpg",
      courts: "3 lapangan",
      price: "Mulai dari Rp 120.000/jam",
    },
    {
      name: "Tennis",
      image:
        "https://via.placeholder.com/400x300/22c55e/ffffff?text=Tennis+Court",
      courts: "4 lapangan",
      price: "Mulai dari Rp 75.000/jam",
    },
    {
      name: "Basketball",
      image:
        "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Basketball+Court",
      courts: "2 lapangan",
      price: "Mulai dari Rp 100.000/jam",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Booking Lapangan <span className="text-yellow-400">Mudah</span> &{" "}
              <span className="text-yellow-400">Cepat</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Platform terpercaya untuk memesan lapangan olahraga dengan
              berbagai pilihan fasilitas terbaik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/lapangan"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                Lihat Lapangan
              </Link>
              <Link
                to="/cuaca"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Cek Cuaca
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="relative">
          <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan pengalaman booking lapangan yang terbaik dengan
              berbagai keunggulan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Sports Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lapangan Populer
            </h2>
            <p className="text-xl text-gray-600">
              Pilih dari berbagai jenis lapangan olahraga yang tersedia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSports.map((sport, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">
                      {sport.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-600 mb-2">
                    {sport.courts}
                  </div>
                  <div className="text-lg font-semibold text-blue-600 mb-4">
                    {sport.price}
                  </div>
                  <Link
                    to="/lapangan"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center block hover:bg-blue-700 transition-colors"
                  >
                    Pesan Sekarang
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Siap untuk Bermain Olahraga?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Bergabunglah dengan ribuan pengguna yang sudah mempercayai platform
            kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Daftar Sekarang
            </Link>
            <Link
              to="/lapangan"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Lihat Semua Lapangan
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">17+</div>
              <div className="text-lg">Lapangan Tersedia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                1000+
              </div>
              <div className="text-lg">Pengguna Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                5000+
              </div>
              <div className="text-lg">Booking Sukses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                24/7
              </div>
              <div className="text-lg">Layanan Online</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
