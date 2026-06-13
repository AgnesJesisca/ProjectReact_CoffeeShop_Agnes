import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./assets/tailwind.css";

import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// MAIN PAGES
const Dashboard = lazy(() => import("./pages/main/Dashboard"));
const Orders = lazy(() => import("./pages/main/Orders"));
const Customers = lazy(() => import("./pages/main/Customers"));
const Menu = lazy(() => import("./pages/main/Menu"));
const Inventory = lazy(() => import("./pages/main/Inventory"));
const OrderDetail = lazy(() => import("./pages/main/OrderDetail"));
const CustomerDetail = lazy(() => import("./pages/main/CustomerDetail"));
const ErrorPage = lazy(() => import("./pages/main/ErrorPage"));
const UserManagement = lazy(() => import("./pages/main/Usermanagement"));

// AUTH PAGES
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));
const isLogin = localStorage.getItem("user");

// COMPONENTS
const Loading = lazy(() => import("./components/Loading"));

function App() {

  const isLogin =
    localStorage.getItem("user");

  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* MAIN */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              isLogin
                ? <Dashboard />
                : <Navigate to="/login" />
            }
          />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/users" element={<UserManagement />} />

          <Route
            path="/400"
            element={
              <ErrorPage
                code="400"
                message="Bad Request"
              />
            }
          />

          <Route
            path="/401"
            element={
              <ErrorPage
                code="401"
                message="Unauthorized"
              />
            }
          />

          <Route
            path="/403"
            element={
              <ErrorPage
                code="403"
                message="Forbidden"
              />
            }
          />

          <Route
            path="*"
            element={
              <ErrorPage
                code="404"
                message="It's look like you're lost"
              />
            }
          />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;