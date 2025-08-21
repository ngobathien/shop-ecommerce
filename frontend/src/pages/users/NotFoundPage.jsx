import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-3 fw-bold">
          <span className="text-danger">Opps!</span> Trang không tồn tại.
        </p>
        <p className="lead">
          Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không
          có.
        </p>
        <Link to="/" className="btn btn-primary mt-3">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
