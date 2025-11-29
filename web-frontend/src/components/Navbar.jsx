import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };
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
          {!user ? (
            <>
              <Link to="/login" className="text-black-600 hover:text-red-700">Masuk</Link>
              <Link to="/register" className="bg-red-700 text-white px-3 py-2 rounded-md hover:bg-red-700">Daftar</Link>
            </>
          ) : (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-black-600 hover:text-red-700 mr-4">Admin</Link>
              )}
              <span className="text-gray-700">{user.name}</span>
              <button onClick={handleLogout} className="bg-gray-200 text-black px-3 py-2 rounded-md">Logout</button>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}
