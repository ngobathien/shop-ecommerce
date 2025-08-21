import React from "react";
import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom"; // ✅ sửa lại đúng thư viện

function AdminLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
