import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';

// User Pages
import Home from "./pages/user/Home";
import Details from "./pages/user/Details";
import Booking from "./pages/user/Booking";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Field from "./pages/Field.jsx";
import Profile from "./pages/user/Profile";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ManageBookings from "./pages/admin/ManageBookingsV2";
import ManageCourts from "./pages/admin/ManageCourts";
import ManageUsers from "./pages/admin/ManageUsers";

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
            <ProtectedRoute>
              <UserLayout>
                <Booking />
              </UserLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserLayout>
                <Profile />
              </UserLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes with Layout (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-bookings"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <ManageBookings />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-courts"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <ManageCourts />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout>
                <ManageUsers />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect deprecated admin profile route */}
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute requiredRole="admin">
              <Navigate to="/admin" replace />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

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
