import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaChartBar,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaHome,
  FaUser, // Icon for profile
  FaSignOutAlt, // Icon for logout
  FaThLarge, // Icon for categories
} from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";

function Sidebar() {
  const { logout } = useContext(AuthContext);
  return (
    <div
      className="d-flex flex-column bg-light border-end vh-100"
      style={{ width: "220px" }}
    >
      <div className="p-3">
        <h4 className="text-center mb-4">Admin</h4>
        <ul className="nav nav-pills flex-column gap-2">
          <li className="nav-item">
            {/* dashboard */}
            <Link to="/admin" className="nav-link text-dark">
              <FaHome className="me-2" />
              Dashboard
            </Link>
          </li>

          {/* doanh thu */}
          <li className="nav-item">
            <Link to="/admin/revenue" className="nav-link text-dark">
              <FaChartBar className="me-2" />
              Doanh thu
            </Link>
          </li>

          {/* quản lý sản phẩm */}
          <li className="nav-item">
            <Link to="/admin/products" className="nav-link text-dark">
              <FaBoxOpen className="me-2" />
              Quản lý sản phẩm
            </Link>
          </li>

          {/* quản lý đơn hàng */}
          <li className="nav-item">
            <Link to="/admin/orders" className="nav-link text-dark">
              <FaShoppingCart className="me-2" />
              Quản lý đơn hàng
            </Link>
          </li>

          {/* quản lý User */}
          <li className="nav-item">
            <Link to="/admin/users" className="nav-link text-dark">
              <FaUsers className="me-2" />
              Quản lý User
            </Link>
          </li>

          {/* quản lý danh mục */}
          <li className="nav-item">
            <Link to="/admin/categories" className="nav-link text-dark">
              <FaThLarge className="me-2" />
              Quản lý danh mục
            </Link>
          </li>

          {/* profile */}
          <li className="nav-item">
            <Link to="/profile-admin" className="nav-link text-dark">
              <FaUser className="me-2" />
              Thông tin cá nhân
            </Link>
          </li>

          {/* đăng xuất */}
          <li className="nav-item">
            <Link onClick={logout} to="/" className="nav-link text-dark">
              <FaSignOutAlt className="me-2" />
              Đăng xuất
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
