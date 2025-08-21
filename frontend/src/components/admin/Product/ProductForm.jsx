import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ProductForm({ initialValues = {}, onSubmit, closeModal, mode }) {
  const [nameProduct, setNameProduct] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [countInStock, setCountInStock] = useState("");

  useEffect(() => {
    if (initialValues) {
      setNameProduct(initialValues.nameProduct || "");
      setCategory(initialValues.category || "");
      setPrice(initialValues.price || "");
      setSize(initialValues.size || "");
      setColor(initialValues.color || "");
      setCountInStock(initialValues.countInStock || "");
    }
  }, [initialValues]);

  // reset form nhập trống sau khi nhập dữ liệu xong
  const resetForm = () => {
    setNameProduct("");
    setCategory("");
    setPrice("");
    setSize("");
    setColor("");
    setCountInStock("");
  };

  // dữ liệu mới
  const newProduct = {
    nameProduct,
    category,
    price: Number(price),
    size,
    color,
    countInStock: Number(countInStock),
  };

  // xử lý khi nhấn submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(newProduct);
      if (mode === "add") {
        resetForm();
      }
    } catch (error) {
      console.error("Lỗi khi submit form:", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {/* tên sản phẩm */}
        <Form.Group className="mb-3" controlId="formNameProduct">
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
            autoFocus
            required
          />
        </Form.Group>

        {/* danh mục */}
        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Danh mục</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập danh mục"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        {/* giá */}
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Giá</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nhập giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min={0}
          />
        </Form.Group>

        {/* tồn kho */}
        <Form.Group className="mb-3" controlId="formCountInStock">
          <Form.Label>Tồn kho</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nhập số lượng tồn kho"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
            min={0}
          />
        </Form.Group>

        {/* color */}
        <Form.Group className="mb-3" controlId="formColor">
          <Form.Label>Màu sắc</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập màu sắc"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </Form.Group>

        {/* size */}
        <Form.Group className="mb-3" controlId="formSize">
          <Form.Label>Size</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={closeModal} className="me-2">
            Đóng
          </Button>
          <Button variant="primary" type="submit">
            {mode === "add" ? "Thêm" : "Lưu"}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default ProductForm;
