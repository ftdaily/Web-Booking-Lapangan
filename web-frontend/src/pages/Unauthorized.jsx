import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md text-center bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Akses Ditolak</h1>
        <p className="text-gray-600 mb-6">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded">Kembali ke Beranda</Link>
          <Link to="/login" className="px-4 py-2 border border-gray-300 rounded">Masuk</Link>
        </div>
      </div>
    </div>
  );
}
