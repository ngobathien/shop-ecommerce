import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

function ProductTable({ products, onDelete, onEdit }) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Danh mục</th>
            <th scope="col">Giá</th>
            <th scope="col">Tồn kho </th>
            <th scope="col">Màu sắc</th>
            <th scope="col">Size</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <tr key={product._id}>
                  <th scope="">{index + 1}</th>
                  <td>{product.nameProduct}</td>
                  <td
                    className="p-2"
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  >
                    <img
                      src={product.images?.[0]?.url || "/placeholder.png"}
                      alt={product.nameProduct}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      }}
                    />
                  </td>

                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.color}</td>
                  <td>{product.size}</td>
                  <td className="d-flex gap-2 justify-content-center align-items-center">
                    <Button
                      onClick={() => onEdit(product)}
                      variant="warning"
                      className="btn-sm"
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => onDelete(product._id)}
                      variant="danger"
                      className="btn-sm"
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Không có sản phẩm
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ProductTable;
