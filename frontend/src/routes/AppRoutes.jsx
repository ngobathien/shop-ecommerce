import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "../pages/users/HomePage";
import BlogPage from "../pages/users/Blogs";
import ContactPage from "../pages/users/Contact";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Cart from "../components/user/Cart/Cart";
import DashboardPage from "../pages/admin/DashboardPage";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import ManageUsersPage from "../pages/admin/ManageUsersPage";
import ManageProductsPage from "../pages/admin/ManageProductsPage";
import ManageOrdersPage from "../pages/admin/ManageOrdersPage";
import ManageRevenuePage from "../pages/admin/ManageRevenuePage";
import ManageCategoriesPage from "../pages/admin/ManageCategoriesPage";

import ProfileUser from "../pages/users/ProfileUser";
import ProfileAdmin from "../pages/admin/ProfileAdmin";
import NotFoundPage from "../pages/users/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      {/* main  */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="profile" element={<ProfileUser />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="blogs" element={<BlogPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="users" element={<ManageUsersPage />} />
        <Route path="revenue" element={<ManageRevenuePage />} />
        <Route path="orders" element={<ManageOrdersPage />} />
        <Route path="products" element={<ManageProductsPage />} />
        <Route path="categories" element={<ManageCategoriesPage />} />
        <Route path="profile-admin" element={<ProfileAdmin />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
