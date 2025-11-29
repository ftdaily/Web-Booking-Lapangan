import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from "../../utils/api";
import { useToast } from '../../contexts/ToastContext';

const Details = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSession, setSelectedSession] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [room, setRoom] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const { showToast } = useToast();

  // Sample session data - some are booked, some are available
  const sessions = [
    { id: 1, time: "08:00 - 09:00", price: "Rp. 50,000", status: "available" },
    { id: 2, time: "09:00 - 10:00", price: "Rp. 50,000", status: "booked" },
    { id: 3, time: "10:00 - 11:00", price: "Rp. 50,000", status: "available" },
    { id: 4, time: "11:00 - 12:00", price: "Rp. 50,000", status: "booked" },
    { id: 5, time: "13:00 - 14:00", price: "Rp. 75,000", status: "available" },
    { id: 6, time: "14:00 - 15:00", price: "Rp. 75,000", status: "available" },
    { id: 7, time: "15:00 - 16:00", price: "Rp. 75,000", status: "booked" },
    { id: 8, time: "16:00 - 17:00", price: "Rp. 75,000", status: "available" },
    { id: 9, time: "17:00 - 18:00", price: "Rp. 100,000", status: "available" },
    { id: 10, time: "18:00 - 19:00", price: "Rp. 100,000", status: "booked" },
  ];

  const handleSessionSelect = (sessionId) => {
    const session = sessions.find((s) => s.id === sessionId);
    const [start] = session.time.split(' - ');
    const isBooked = bookedSlots.some(b => b.start_time === start);
    if (!isBooked) {
      setSelectedSession(sessionId);
      setShowBookingForm(true);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  useEffect(() => {
    const loadRoom = async () => {
      try {
        if (!id) return;
        const { data } = await api.get(`/rooms/${id}`);
        setRoom(data);
      } catch (err) {
        console.warn('Failed to load room', err);
      }
    };
    loadRoom();
  }, [id]);

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        if (!id || !selectedDate) return;
        const { data } = await api.get(`/rooms/${id}/availability`, { params: { date: selectedDate } });
        setBookedSlots(data.data || []);
      } catch (err) {
        console.warn('Error loading availability', err);
        setBookedSlots([]);
      }
    };
    loadAvailability();
  }, [id, selectedDate]);

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    if (!selectedDate || !selectedSession || !uploadedFile) {
      alert("Mohon lengkapi semua field yang diperlukan!");
      return;
    }

    const selectedSessionData = sessions.find((s) => s.id === selectedSession);
    // Build payload for backend
    const payload = {
      room_id: id || 1,
      booking_date: selectedDate,
      start_time: selectedSessionData.time.split(' - ')[0],
      end_time: selectedSessionData.time.split(' - ')[1],
      total_price: parseInt(selectedSessionData.price.replace(/[^0-9]/g, '')),
      note: 'Booking via frontend',
    };

    // Post to backend with file uploading (if supported) - fallback to local alert if backend unavailable
    const submitBooking = async () => {
      try {
        // Optionally: implement formData if backend supports file upload
        await api.post('/bookings', payload);
        showToast('Pemesanan berhasil! Cek halaman Riwayat Booking.', 'info');
        setShowBookingForm(false);
      } catch (err) {
        console.warn('Booking failed, fallback to local success message', err);
        showToast('Gagal memesan: ' + (err?.response?.data?.message || err?.message || 'Kesalahan'), 'error');
        setShowBookingForm(false);
      }
    };
    submitBooking();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src="https://images.tokopedia.net/blog-tokopedia-com/uploads/2021/01/Ukuran-Lapangan-Bulu-Tangkis.jpg"
                alt="Lapangan Badminton"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {room?.name || 'Lapangan Badminton A'}
                </h1>
                <p className="text-xl text-gray-600 mb-4">Fasilitas Premium</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Fasilitas:
                  </h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• AC dan ventilasi yang baik</li>
                    <li>• Lantai standar internasional</li>
                    <li>• Lighting berkualitas tinggi</li>
                    <li>• Kamar ganti dan shower</li>
                    <li>• Parkir gratis</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Schedule */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Jadwal Sesi Tersedia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sessions.map((session) => {
              const start = session.time.split(' - ')[0];
              const isBooked = bookedSlots.some(b => b.start_time === start);
              const disabled = isBooked || session.status === 'booked';
              return (
                <div
                  key={session.id}
                  onClick={() => handleSessionSelect(session.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    !disabled
                      ? selectedSession === session.id
                        ? "border-green-500 bg-green-50 shadow-lg"
                        : "border-green-200 bg-white hover:border-green-400 hover:shadow-md"
                      : "border-red-200 bg-red-50 cursor-not-allowed opacity-60"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      {session.time}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        !disabled
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {!disabled ? "Tersedia" : "Dipesan"}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-blue-600">{session.price}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Form Pemesanan
            </h2>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Selection */}
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tanggal Pemesanan
                  </label>
                  <input
                    type="date"
                    id="booking-date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Selected Session Display */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sesi Dipilih
                  </label>
                  <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    {selectedSession
                      ? sessions.find((s) => s.id === selectedSession)?.time
                      : "Belum dipilih"}
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label
                  htmlFor="document-upload"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload Dokumen Identitas (KTP/SIM/Paspor)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="document-upload"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {uploadedFile && (
                    <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
                      File terpilih: {uploadedFile.name}
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Format yang diterima: PDF, JPG, PNG, DOC, DOCX (Max: 5MB)
                </p>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Ringkasan Pemesanan
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lapangan:</span>
                    <span className="font-medium">{room?.name || 'Lapangan Badminton A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tanggal:</span>
                    <span className="font-medium">{selectedDate || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waktu:</span>
                    <span className="font-medium">
                      {selectedSession
                        ? sessions.find((s) => s.id === selectedSession)?.time
                        : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total Harga:</span>
                    <span className="text-blue-600">
                      {selectedSession
                        ? sessions.find((s) => s.id === selectedSession)?.price
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Konfirmasi Pemesanan
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
