import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Sửa import từ react-router thành react-router-dom
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "../../contexts/AuthProvider";

function Header() {
  // Lấy isAuthenticated và loading từ context
  const { authUser, isAuthenticated, loading, logout } =
    useContext(AuthContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-sm" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          NBT
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Trang chủ
            </Nav.Link>

            {/* Thêm một trạng thái loading */}
            {loading ? (
              <Nav.Link disabled>Đang tải...</Nav.Link>
            ) : !isAuthenticated ? ( // Sử dụng isAuthenticated để kiểm tra
              <>
                <Nav.Link as={Link} to="/login">
                  Đăng nhập
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Đăng ký
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                // Dùng optional chaining (?) để tránh lỗi nếu user là null
                title={`Hello ${authUser?.username}`}
                id="user-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Thông tin cá nhân
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
              </NavDropdown>
            )}

            <Nav.Link as={Link} to="/cart">
              Giỏ hàng
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
