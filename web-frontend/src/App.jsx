import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// User Pages
import Home from "./pages/user/Home";
import Details from "./pages/user/Details";
import Booking from "./pages/user/Booking";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Field from "./pages/Field.jsx";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ManageBookings from "./pages/admin/ManageBookings";
import ManageCourts from "./pages/admin/ManageCourts";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes (Login/Register) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes with Layout */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/lapangan"
          element={
            <UserLayout>
              <Field />
            </UserLayout>
          }
        />
        <Route
          path="/lapangan/:id"
          element={
            <UserLayout>
              <Details />
            </UserLayout>
          }
        />
        <Route
          path="/booking"
          element={
            <UserLayout>
              <Booking />
            </UserLayout>
          }
        />

        {/* Admin Routes with Layout */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/manage-bookings"
          element={
            <AdminLayout>
              <ManageBookings />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/manage-courts"
          element={
            <AdminLayout>
              <ManageCourts />
            </AdminLayout>
          }
        />

        {/* Legacy routes - can be removed later */}
        <Route
          path="/details"
          element={
            <UserLayout>
              <Details />
            </UserLayout>
          }
        />
        <Route
          path="/field"
          element={
            <UserLayout>
              <Field />
            </UserLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
