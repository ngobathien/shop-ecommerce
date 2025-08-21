import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function ProfileUser() {
  const { authUser } = useContext(AuthContext);

  const navigate = useNavigate();
  // if (!authUser) {
  //   navigate("/login");
  //   return null; // Hoặc có thể hiển thị một thông báo khác nếu cần
  // }

  if (!authUser) {
    return (
      <div className="container mt-5 text-center">
        <h2>Bạn cần đăng nhập để xem trang này.</h2>
        <Link to="/login" className="btn btn-primary mt-3">
          Đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card style={{ width: "30rem" }} className="shadow-lg">
        <Card.Body>
          <Card.Title className="text-center mb-4 display-6">
            Thông tin cá nhân
          </Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <span className="fw-bold">ID:</span> {authUser._id}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Họ tên:</span>{" "}
              {`${authUser.lastname} ${authUser.firstname}`}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Email:</span> {authUser.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Tên người dùng:</span>
              {authUser.username}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Vai trò:</span> {authUser.role}
            </ListGroup.Item>
          </ListGroup>
          <div className="d-grid gap-2 mt-4">
            <Button variant="primary">Sửa thông tin</Button>
            <Button variant="outline-danger">Đăng xuất</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfileUser;
