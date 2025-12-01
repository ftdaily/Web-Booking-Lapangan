import React, { useState, useEffect } from "react";
import CourtModalForm from "../components/CourtModalForm";
import api from "../utils/api";
import { Link, useLocation } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // Court modal state to be used globally within admin layout
  const [courtModalOpen, setCourtModalOpen] = useState(false);
  const [courtModalMode, setCourtModalMode] = useState("add"); // 'add' or 'edit'
  const [courtModalData, setCourtModalData] = useState(null);
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7zm8 4l4-4H7l4 4z"
          />
        </svg>
      ),
    },
    {
      name: "Kelola Booking",
      href: "/admin/manage-bookings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Kelola Lapangan",
      href: "/admin/manage-courts",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      name: "Kelola User",
      href: "/admin/manage-users",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Admin layout does not handle auth here; route-level guard will handle it

  useEffect(() => {
    const onOpenAdd = () => {
      setCourtModalMode("add");
      setCourtModalData(null);
      setCourtModalOpen(true);
    };
    const onOpenEdit = async (e) => {
      const id = e?.detail?.id;
      if (!id) return;
      // Fetch room details and open edit form
      try {
        const { data } = await api.get(`/rooms/${id}`);
        const room = data?.data || data || data?.room || data;
        setCourtModalMode("edit");
        setCourtModalData(room);
        setCourtModalOpen(true);
      } catch (err) {
        console.warn("Failed to fetch room for edit", err);
        // open empty edit form as fallback
        setCourtModalMode("edit");
        setCourtModalData({ id });
        setCourtModalOpen(true);
      }
    };
    window.addEventListener("openAddCourt", onOpenAdd);
    window.addEventListener("openEditCourt", onOpenEdit);
    return () => {
      window.removeEventListener("openAddCourt", onOpenAdd);
      window.removeEventListener("openEditCourt", onOpenEdit);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 bg-white shadow-lg flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <span className="text-xl font-bold text-gray-900">
                  SportHub
                </span>
                <span className="block text-xs text-blue-600 font-medium">
                  Admin Panel
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors group ${
                isActive(item.href)
                  ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {sidebarOpen && <span className="ml-3">{item.name}</span>}
              {!sidebarOpen && (
                <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Sidebar Toggle */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className={`w-5 h-5 transition-transform ${
                sidebarOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {navigation.find((nav) => nav.href === location.pathname)
                  ?.name || "Dashboard"}
              </h1>
              <p className="text-sm text-gray-600">
                Kelola sistem booking lapangan olahraga
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              {/* <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM10 17v5l-5-5h5z"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button> */}

              {/* Quick Actions */}
              <div className="relative group">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <Link
                      to="/admin/manage-bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tambah Booking
                    </Link>
                    <button
                      onClick={() =>
                        window.dispatchEvent(new CustomEvent("openAddCourt"))
                      }
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tambah Lapangan
                    </button>
                    <Link
                      to="/admin/manage-users"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tambah User
                    </Link>
                  </div>
                </div>
              </div>

              {/* Admin Profile */}
              <div className="relative group">
                <button className="flex items-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    A
                  </div>
                  <span className="ml-2 text-sm font-medium">Admin</span>
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    {/* Removed Profil Admin; admins can access the dashboard via sidebar */}
                    <Link
                      to="/admin/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Pengaturan
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Lihat Website
                    </Link>
                    <hr className="border-gray-200 my-1" />
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Court Modal Overlay (Add/Edit) */}
        {courtModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg max-w-3xl w-full p-6">
              <h3 className="text-lg font-semibold mb-4">
                {courtModalMode === "add" ? "Tambah Lapangan" : "Edit Lapangan"}
              </h3>
              <CourtModalForm
                initialData={courtModalData}
                mode={courtModalMode}
                onClose={() => setCourtModalOpen(false)}
                onSaved={() => {
                  // notify other pages to reload rooms
                  window.dispatchEvent(new CustomEvent("roomSaved"));
                  setCourtModalOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>© 2024 SportHub Admin Panel. All rights reserved.</span>
            {/* <div className="flex space-x-4">
              <Link to="/admin/help" className="hover:text-gray-900">
                Bantuan
              </Link>
              <Link to="/admin/docs" className="hover:text-gray-900">
                Dokumentasi
              </Link>
              <span>v1.0.0</span>
            </div> */}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
