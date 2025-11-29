import React from 'react';

const QrModal = ({ open, onClose, orderId, size = 220, message }) => {
  if (!open) return null;
  const qrData = `ORDER:${orderId}`;
  const qrUrl = `https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${encodeURIComponent(qrData)}`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">QR Pembayaran (QRIS Mock)</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Close</button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img src={qrUrl} alt="QR Code" width={size} height={size} className="bg-white p-2" />
          <div className="text-sm text-gray-700 text-center">Scan QR untuk membayar. (Mock - tidak melakukan pembayaran nyata)</div>
          {orderId && <div className="text-xs text-gray-500">Order: <code>{orderId}</code></div>}
          {message && <div className="text-sm text-gray-700 text-center">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default QrModal;
