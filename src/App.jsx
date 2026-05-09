import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";

import { MainLayout } from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

const Dashboard = React.lazy(() => import("./pages/main/Dashboard"));
const Orders = React.lazy(() => import("./pages/main/Orders"));
const Customers = React.lazy(() => import("./pages/main/Customers"));
const ErrorPage = React.lazy(() => import("./pages/main/ErrorPage"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Loading = React.lazy(() => import("./components/Loading"));

const Menu = React.lazy(() => import("./pages/main/Menu"));
const Inventory = React.lazy(() => import("./pages/main/Inventory"));
const Revenue = React.lazy(() => import("./pages/main/Revenue"));
const OrderDetail = React.lazy(() => import("./pages/main/OrderDetail"));
const CustomerDetail = React.lazy(() => import("./pages/main/CustomerDetail"));


function App() {
  return (
   <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/:id" element={<CustomerDetail />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/revenue" element={<Revenue />} />

      <Route path="/400" element={<ErrorPage code="400" message="Bad Request" />} />
      <Route path="/401" element={<ErrorPage code="401" message="Unauthorized" />} />
      <Route path="/403" element={<ErrorPage code="403" message="Forbidden" />} />

      <Route path="*" element={<ErrorPage code="404" message="It's look like you're lost" />} />
    </Route>
      <Route element={<AuthLayout/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
              <Route path="/forgot" element={<Forgot/>} />
          </Route>
    </Routes>
    </Suspense>
  );
}

export default App;