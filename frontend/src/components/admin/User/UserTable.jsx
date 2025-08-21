import React, { useContext } from "react";
import { UserContext } from "../../../contexts/UserProvider";
import { Button } from "react-bootstrap";

function UserTable() {
  const users = useContext(UserContext);
  console.log(users);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>User ID</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Tên đăng nhập</th>
          <th>Vai trò</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>{user._id}</td>
              <td>{`${user.lastname} ${user.firstname}`}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td className="d-flex gap-2 justify-content-center align-items-center">
                <Button
                  //   onClick={() => onEdit(user)}
                  variant="warning"
                  className="btn-sm"
                >
                  Sửa
                </Button>
                <Button
                  //   onClick={() => onDelete(user._id)}
                  variant="danger"
                  className="btn-sm"
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              Không có người dùng
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UserTable;
