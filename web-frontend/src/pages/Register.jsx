import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    npm: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register: registerAction } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // clear general errors when user edits
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap harus diisi";
    }

    if (!formData.email) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Nomor telepon harus diisi";
    }

    if (!formData.npm) {
      newErrors.npm = "NPM harus diisi";
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Anda harus menyetujui syarat dan ketentuan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.debug('Register submit clicked', formData);
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: formData.fullName,
        npm: formData.npm,
        email: formData.email,
        phone: formData.phoneNumber,
        password: formData.password,
      };
      const data = await registerAction(payload);
      console.log('Registration result:', data);
      // `register` may set httpOnly cookie for authentication in backend
      alert(data?.message || 'Pendaftaran berhasil! Silakan login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      const serverMessage = err?.response?.data?.message;
      const serverErrors = err?.response?.data?.errors;
      if (serverErrors && typeof serverErrors === 'object') {
        setErrors(prev => ({ ...prev, ...serverErrors }));
      } else if (err?.response?.status === 409) {
        // Duplicate entry
        setErrors(prev => ({ ...prev, general: serverMessage || 'Email atau NPM sudah terdaftar.' }));
      } else {
        setErrors(prev => ({ ...prev, general: serverMessage || 'Terjadi kesalahan. Silakan coba lagi.' }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Daftar Akun Baru</h1>
          <p className="text-gray-600 mt-2">Bergabunglah untuk memesan lapangan</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {errors.general && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan nama lengkap"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NPM
              </label>
              <input
                type="text"
                name="npm"
                value={formData.npm}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan NPM"
              />
              {errors.npm && (
                <p className="mt-1 text-sm text-red-600">{errors.npm}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="contoh@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="08123456789"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ulangi password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-3 text-sm text-gray-700">
                Saya menyetujui syarat dan ketentuan
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Mendaftar..." : "Daftar"}
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Login di sini
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
