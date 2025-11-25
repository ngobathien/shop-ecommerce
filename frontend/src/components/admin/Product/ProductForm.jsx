import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function ProductForm({ initialValues = {}, onSubmit, closeModal, mode }) {
  const [nameProduct, setNameProduct] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Xử lý thêm ảnh (chỉ một ảnh mỗi lần)
  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    setImages((prev) => [...prev, file]);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagesPreview((prev) => [...prev, reader.result]);
        toast.success("Đã thêm ảnh thành công!", { autoClose: 2000 });
        setLoading(false);
        e.target.value = null; // Reset input file để chọn lại cùng file
      }
    };

    reader.readAsDataURL(file);
  };

  // Xóa ảnh
  const handleRemoveImage = (index) => {
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
    toast.success("Đã xóa ảnh thành công!", { autoClose: 2000 });
  };

  // Sửa ảnh
  const handleEditImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    setImages((prev) => prev.map((img, i) => (i === index ? file : img)));

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagesPreview((prev) =>
          prev.map((img, i) => (i === index ? reader.result : img))
        );
        toast.success("Đã sửa ảnh thành công!", { autoClose: 2000 });
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Khởi tạo giá trị ban đầu
  useEffect(() => {
    if (initialValues) {
      setNameProduct(initialValues.nameProduct || "");
      setCategory(initialValues.category || "");
      setPrice(initialValues.price || "");
      setSize(initialValues.size || "");
      setColor(initialValues.color || "");
      setCountInStock(initialValues.countInStock || "");
      setImages(initialValues.image || []);
      setImagesPreview(initialValues.image || []);
    }
  }, [initialValues]);

  // Reset form
  const resetForm = () => {
    setNameProduct("");
    setCategory("");
    setPrice("");
    setSize("");
    setColor("");
    setCountInStock("");
    setImages([]);
    setImagesPreview([]);
    setErrors({});
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!nameProduct.trim()) newErrors.nameProduct = "Tên sản phẩm là bắt buộc";
    if (!category.trim()) newErrors.category = "Danh mục là bắt buộc";
    if (!price || price <= 0) newErrors.price = "Giá phải lớn hơn 0";
    if (!countInStock || countInStock < 0)
      newErrors.countInStock = "Tồn kho không được âm";
    if (images.length === 0) newErrors.images = "Vui lòng thêm ít nhất một ảnh";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin!", { autoClose: 3000 });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("nameProduct", nameProduct);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("countInStock", countInStock);

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await onSubmit(formData);
      toast.success(
        `Đã ${mode === "add" ? "thêm" : "cập nhật"} sản phẩm thành công!`,
        {
          autoClose: 2000,
        }
      );
      if (mode === "add") {
        resetForm();
      }
      closeModal();
    } catch (error) {
      console.error("Lỗi khi submit form:", error);
      toast.error("Đã có lỗi xảy ra khi gửi form!", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-relative p-4 bg-light rounded-3 shadow-lg">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {loading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(255, 255, 255, 0.85)", zIndex: 50 }}
        >
          <ClipLoader color="#0d6efd" size={60} />
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        {/* Thông báo lỗi chung */}
        {errors.submit && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {errors.submit}
            <button
              type="button"
              className="btn-close"
              onClick={() => setErrors({ ...errors, submit: "" })}
            ></button>
          </div>
        )}

        {/* Tên sản phẩm */}
        <Form.Group className="mb-3" controlId="formNameProduct">
          <Form.Label className="fw-semibold text-primary">
            Tên sản phẩm
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={nameProduct}
            onChange={(e) => setNameProduct(e.target.value)}
            className={`rounded-3 shadow-sm ${
              errors.nameProduct ? "is-invalid" : ""
            }`}
            autoFocus
            required
            disabled={loading}
          />
          {errors.nameProduct && (
            <Form.Control.Feedback type="invalid">
              {errors.nameProduct}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* Danh mục */}
        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label className="fw-semibold text-primary">Danh mục</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập danh mục"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`rounded-3 shadow-sm ${
              errors.category ? "is-invalid" : ""
            }`}
            required
            disabled={loading}
          />
          {errors.category && (
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* Giá */}
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label className="fw-semibold text-primary">Giá</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nhập giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`rounded-3 shadow-sm ${
              errors.price ? "is-invalid" : ""
            }`}
            required
            min={0}
            step="0.01"
            disabled={loading}
          />
          {errors.price && (
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* Tồn kho */}
        <Form.Group className="mb-3" controlId="formCountInStock">
          <Form.Label className="fw-semibold text-primary">Tồn kho</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nhập số lượng tồn kho"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            className={`rounded-3 shadow-sm ${
              errors.countInStock ? "is-invalid" : ""
            }`}
            required
            min={0}
            disabled={loading}
          />
          {errors.countInStock && (
            <Form.Control.Feedback type="invalid">
              {errors.countInStock}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* Màu sắc */}
        <Form.Group className="mb-3" controlId="formColor">
          <Form.Label className="fw-semibold text-primary">Màu sắc</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập màu sắc (ví dụ: Đỏ, Xanh)"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="rounded-3 shadow-sm"
            disabled={loading}
          />
        </Form.Group>

        {/* Size */}
        <Form.Group className="mb-3" controlId="formSize">
          <Form.Label className="fw-semibold text-primary">Size</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập size (ví dụ: S, M, L)"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="rounded-3 shadow-sm"
            disabled={loading}
          />
        </Form.Group>

        {/* Hình ảnh */}
        <Form.Group className="mb-3" controlId="formImages">
          <Form.Label className="fw-semibold text-primary">Hình ảnh</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleProductImageChange}
            className={`rounded-3 shadow-sm ${
              errors.images ? "is-invalid" : ""
            }`}
            disabled={loading}
          />
          {errors.images && (
            <Form.Control.Feedback type="invalid">
              {errors.images}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* Preview ảnh */}
        <div className="d-flex flex-wrap gap-3 mt-3">
          {imagesPreview.map((image, i) => (
            <div
              key={i}
              className="position-relative border rounded-3 shadow-sm overflow-hidden"
              style={{
                width: "140px",
                height: "140px",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src={image}
                alt={`preview-${i}`}
                className="w-100 h-100 object-fit-cover"
              />
              <div
                className="position-absolute top-0 end-0 d-flex gap-2 p-2"
                style={{ zIndex: 5 }}
              >
                <Button
                  variant="danger"
                  size="sm"
                  className="rounded-circle d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: "32px",
                    height: "32px",
                    transition: "all 0.2s",
                  }}
                  onClick={() => handleRemoveImage(i)}
                  disabled={loading}
                >
                  <FaTrash size={16} />
                </Button>
                <Form.Label
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <FaEdit size={16} />
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={(e) => handleEditImage(e, i)}
                    disabled={loading}
                  />
                </Form.Label>
              </div>
            </div>
          ))}
        </div>

        {/* Nút hành động */}
        <div className="d-flex justify-content-end gap-3 mt-4">
          <Button
            variant="outline-secondary"
            onClick={closeModal}
            className="rounded-3 px-4 py-2 shadow-sm"
            style={{ transition: "all 0.2s" }}
            disabled={loading}
          >
            Đóng
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="rounded-3 px-4 py-2 shadow-sm"
            style={{ transition: "all 0.2s" }}
            disabled={loading}
          >
            {mode === "add" ? "Thêm sản phẩm" : "Lưu thay đổi"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ProductForm;
