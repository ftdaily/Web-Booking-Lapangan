export default function Navbar() {
  return (
    // Background
    <nav className="w-full shadow-md bg-white px-6 py-3 flex ">
      {/* === menu utama  === */}
      <ul className="flex gap-6 text-black-700 font-medium items-center justify-between w-full">
        <div className="flex items-center gap-6 mr-20">
          <li>
            <a href="/" className="hover:text-red-700">
              Home
            </a>
          </li>
          <li>
            <a href="/field" className="hover:text-red-700">
              Sewa Lapangan
            </a>
          </li>
          <li>
            <a href="/field" className="hover:text-black-300">
              Sewa Ruangan
            </a>
          </li>
        </div>
        {/* === login dan daftar === */}
        <div className="flex items-center gap-4">
          <a href="/login" className="text-black-600 hover:text-red-700">
            Masuk
          </a>
          <a
            href="/register"
            className="bg-red-700 text-white px-3 py-2 rounded-md hover:bg-red-700"
          >
            {" "}
            Daftar
          </a>
        </div>
      </ul>
    </nav>
  );
}
