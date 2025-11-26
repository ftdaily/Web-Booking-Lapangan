export default function Navbar() {
    return(
    // Background
    <nav className = "w-full shadow-md bg-white px-6 py-3 flex items-center justify-between">
    {/* === menu utama  === */}
    <ul className="flex gap-6 text-black-700 font-medium items-center">
        <li><a href="/" className="hover:text-red-700">Sewa Lapangan</a></li>
        <li><a href="/main-bareng" className="hover:text-black-300">Sewa Ruangan</a></li>
    {/* === login dan daftar === */}
    <div className = 'flex items-center gap-4'>
    <a href="/login" className="text-black-600 hover:text-red-700">Masuk</a>
    <a href="/register" className="bg-red-700 text-white px-3 py-2 rounded-md hover:bg-red-700"> Daftar</a>
    </div>
    </ul>
    </nav>
 );
}
    