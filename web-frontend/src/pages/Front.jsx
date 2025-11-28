import React from "react";
import { Link } from "react-router-dom";

export const Front = () => {
  const teamMembers = [
    {
      name: "Ahmad Rizki",
      role: "Frontend Developer",
      avatar: "https://via.placeholder.com/150x150/4f46e5/ffffff?text=AR",
    },
    {
      name: "Siti Nurhaliza",
      role: "Backend Developer",
      avatar: "https://via.placeholder.com/150x150/10b981/ffffff?text=SN",
    },
    {
      name: "Budi Santoso",
      role: "UI/UX Designer",
      avatar: "https://via.placeholder.com/150x150/f59e0b/ffffff?text=BS",
    },
    {
      name: "Maya Putri",
      role: "Project Manager",
      avatar: "https://via.placeholder.com/150x150/ef4444/ffffff?text=MP",
    },
  ];

  const achievements = [
    {
      number: "17+",
      label: "Lapangan Tersedia",
      icon: "🏟️",
    },
    {
      number: "1000+",
      label: "Pengguna Aktif",
      icon: "👥",
    },
    {
      number: "5000+",
      label: "Booking Sukses",
      icon: "✅",
    },
    {
      number: "24/7",
      label: "Layanan Online",
      icon: "🕐",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tentang <span className="text-yellow-400">SportBook</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Platform booking lapangan olahraga terdepan yang memudahkan Anda
              untuk memesan fasilitas olahraga berkualitas kapan saja dan di
              mana saja
            </p>
            <div className="flex justify-center gap-6">
              <Link
                to="/lapangan"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                Mulai Booking
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Misi Kami
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Kami berkomitmen untuk menyediakan platform yang memudahkan
                pecinta olahraga dalam memesan lapangan dengan sistem yang
                transparan, mudah digunakan, dan terpercaya.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">🎯</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Kemudahan Akses
                    </h3>
                    <p className="text-gray-600">
                      Akses mudah ke berbagai jenis lapangan olahraga
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">⚡</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Booking Cepat
                    </h3>
                    <p className="text-gray-600">
                      Proses booking yang cepat dan efisien
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">💎</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Kualitas Terbaik
                    </h3>
                    <p className="text-gray-600">
                      Lapangan berkualitas dengan fasilitas lengkap
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-8">
              <img
                src="https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/01/Ukuran-Lapangan-Bulu-Tangkis.jpg"
                alt="Sports facility"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pencapaian Kami
            </h2>
            <p className="text-xl text-gray-600">
              Kepercayaan yang telah diberikan oleh ribuan pengguna
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {achievement.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tim Pengembang
            </h2>
            <p className="text-xl text-gray-600">
              Tim profesional yang berdedikasi mengembangkan platform terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Teknologi yang Digunakan
            </h2>
            <p className="text-xl text-gray-600">
              Dibangun dengan teknologi modern dan terpercaya
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-3">⚛️</div>
                <h3 className="font-semibold">React</h3>
                <p className="text-sm text-gray-600">Frontend Framework</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-3">🟢</div>
                <h3 className="font-semibold">Node.js</h3>
                <p className="text-sm text-gray-600">Backend Runtime</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-3">🍃</div>
                <h3 className="font-semibold">MongoDB</h3>
                <p className="text-sm text-gray-600">Database</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="font-semibold">Tailwind</h3>
                <p className="text-sm text-gray-600">CSS Framework</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ada Pertanyaan?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Hubungi kami untuk informasi lebih lanjut atau bantuan teknis
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="text-2xl mb-2">📧</div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-blue-100">info@sportbook.com</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📱</div>
              <h3 className="font-semibold mb-1">WhatsApp</h3>
              <p className="text-blue-100">+62 812-3456-7890</p>
            </div>
            <div>
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-semibold mb-1">Lokasi</h3>
              <p className="text-blue-100">Jakarta, Indonesia</p>
            </div>
          </div>

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
              Lihat Lapangan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
