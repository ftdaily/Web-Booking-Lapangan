import React from "react";

const venues = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: "lorem ipsum",
  price: "Rp250,000 /jam",
  type: "Venue",
  image:
    "https://images.pexels.com/photos/976873/pexels-photo-976873.jpeg?auto=compress&cs=tinysrgb&w=1200", // ganti dengan gambar sendiri
}));

const Field = () => {
  return (
    <div className=" bg-stone-200 font-sans">
      {/* HERO BAR BIRU */}
      <section className="w-full bg-[#006b80] flex items-center justify-center py-6">
        <h1 className="text-white tracking-[0.2em] uppercase text-lg font-semibold">
          BOOKING SEKARANG
        </h1>
      </section>

      {/* MAIN */}
      <main className="px-4 sm:px-8 lg:px-20 py-8  flex flex-col min-h-screen">
        {/* FILTER SECTION */}
        <section className="flex flex-col gap-4 items-center mb-6 ">
          <p className="text-sm">
            Menampilkan <span className="font-bold">6 Lapangan tersedia</span>
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <form action="" className="gap-3 flex">
              <input type="text" placeholder="Pilih lapangan" className="bg-stone-300 p-4 rounded-full"/>
              <input type="text" placeholder="Jam" className="bg-stone-300 p-4 rounded-full"/>
            </form>

            {/* icon filter */}
            <button className="w-12 h-10 flex items-center justify-center bg-white rounded-2xl shadow-sm">
              {/* ganti dengan SVG slider kalau mau */}
              <span className="text-lg">☰</span>
            </button>

            {/* tombol cari */}
            <button className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold">
              Cari Lapangan
            </button>
          </div>
        </section>

        {/* GRID KARTU VENUE */}
        <section className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {venues.map((v) => (
            <article
              key={v.id}
              className="bg-[#dedede] rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-4 pt-3 pb-4">
                <p className="text-[10px] text-gray-600 mb-1">{v.type}</p>
                <h2 className="text-sm font-semibold mb-3">{v.name}</h2>
                <p className="text-[11px] m-0">Mulai</p>
                <p className="text-xs font-bold m-0">{v.price}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Field;
