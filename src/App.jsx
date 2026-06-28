import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./assets/tailwind.css";

import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// GUEST
const Home = lazy(() => import("./pages/guest/Home"));

// AUTH
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

// MEMBER
const MemberDashboard = lazy(() => import("./pages/member/MemberDashboard"));

// MAIN (ADMIN)
const Dashboard = lazy(() => import("./pages/main/Dashboard"));
const Orders = lazy(() => import("./pages/main/Orders"));
const Customers = lazy(() => import("./pages/main/Customers"));
const Menu = lazy(() => import("./pages/main/Menu"));
const Inventory = lazy(() => import("./pages/main/Inventory"));
const OrderDetail = lazy(() => import("./pages/main/OrderDetail"));
const CustomerDetail = lazy(() => import("./pages/main/CustomerDetail"));
const UserManagement = lazy(() => import("./pages/main/UserManagement"));
const ErrorPage = lazy(() => import("./pages/main/ErrorPage"));
const Reviews = lazy(() => import("./pages/main/Reviews"));

// COMPONENT
const Loading = lazy(() => import("./components/Loading"));

// Guard khusus untuk halaman Member (/member)
// Hanya boleh diakses jika sudah login (role apapun)
// Jika belum login → /login
// Jika sudah login sebagai admin → /admin/dashboard (admin tidak perlu ke /member)
function MemberRoute({ children }) {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;
  try {
    user = JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // Admin yang nyasar ke /member → kembalikan ke dashboard admin
  if (user.role?.toLowerCase() === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* GUEST — Landing Page */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* MEMBER — hanya untuk customer yang sudah login */}
        <Route
          path="/member"
          element={
            <MemberRoute>
              <MemberDashboard />
            </MemberRoute>
          }
        />

        {/* ADMIN AREA — hanya untuk role admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="menu" element={<Menu />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reviews" element={<Reviews />} />

          <Route path="400" element={<ErrorPage code="400" message="Bad Request" />} />
          <Route path="401" element={<ErrorPage code="401" message="Unauthorized" />} />
          <Route path="403" element={<ErrorPage code="403" message="Forbidden" />} />
          <Route path="*" element={<ErrorPage code="404" message="It's look like you're lost" />} />
        </Route>

        {/* Fallback global */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
}

export default App;