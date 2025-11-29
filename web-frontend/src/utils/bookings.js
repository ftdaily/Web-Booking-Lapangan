export function formatCurrency(amount) {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

export function formatDate(value) {
  if (!value) return '';
  try {
    const d = new Date(value);
    return d.toLocaleDateString('id-ID');
  } catch (err) {
    return value;
  }
}

export const bookingCodeFromId = (id) => `BK${String(id).padStart(4, '0')}`;

export function normalizeBooking(b) {
  const amount = Number(b.amount ?? b.total_price ?? 0);
  return {
    id: b.id,
    customer: b.customer || b.user_name || b.name,
    courtName: b.court || b.courtName || b.room_name,
    court: b.court || b.courtName || b.room_name,
    date: b.date || b.booking_date,
    time: b.time || (b.start_time && b.end_time ? `${b.start_time} - ${b.end_time}` : ''),
    status: b.status,
    amount,
    price: formatCurrency(amount),
    bookingCode: b.bookingCode || bookingCodeFromId(b.id),
    phone: b.phone,
    createdAt: b.createdAt || b.created_at,
    raw: b,
  };
}

export function normalizeBookingList(list) {
  if (!Array.isArray(list)) return [];
  return list.map(normalizeBooking);
}
