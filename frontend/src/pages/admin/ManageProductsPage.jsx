import React, { useState } from "react";
import AddProduct from "../../components/admin/Product/AddProduct";
import ProductTable from "../../components/admin/Product/ProductTable";
import useProducts from "../../hooks/useProducts";
import ProductForm from "../../components/admin/Product/ProductForm";
import EditProduct from "../../components/admin/Product/EditProduct";
import Button from "react-bootstrap/esm/Button";

function ManageProductsPage() {
  // gọi từ hook useProducts
  const {
    products,
    getProductById,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
  } = useProducts();

  // state modal
  // const [showModal, setShowModal] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // // hiện modal
  // const handleShowModal = () => {
  //   setShowModal(!showModal);
  // };
  // // đóng, ẩn modal
  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  // =====================show add=================================
  // hiện modal thêm
  const handleShowAdd = () => {
    setShowAdd(true);
  };

  // đóng, ẩn modal thêm
  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  // ========================show edit=================================
  // show mở modal edit
  const handleShowEdit = (product) => {
    setEditingProduct(product);
    setShowEdit(true);
  };

  // đóng, ẩn modal edit
  const handleCloseEdit = () => {
    setShowEdit(false);
    setEditingProduct(null);
  };

  // handle submit thêm
  const handleSubmitAdd = async (data) => {
    await handleCreateProduct(data);
    handleCloseAdd();
  };

  // handle submit sửa
  const handleSubmitEdit = async (data) => {
    if (editingProduct && editingProduct._id) {
      await handleUpdateProduct(editingProduct._id, data);
      setEditingProduct(null);
      handleCloseEdit();
    } else {
      console.error("Không có sản phẩm để chỉnh sửa");
    }
  };
  // handle submit xóa
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      handleDeleteProduct(id);
    }
  };

  return (
    <>
      <h1>Danh sách sản phẩm</h1>
      <Button variant="primary" onClick={handleShowAdd}>
        Thêm sản phẩm
      </Button>
      {/* tạo, thêm sản phẩm mới */}
      <AddProduct
        onSubmit={handleSubmitAdd}
        showAdd={showAdd}
        closeAdd={handleCloseAdd}
      />
      {/* chỉnh sửa sản phẩm */}
      <EditProduct
        onSubmit={handleSubmitEdit}
        showEdit={showEdit}
        closeEdit={handleCloseEdit}
        product={editingProduct}
      />
      {/* bảng, danh sách sản phẩm */}
      <ProductTable
        products={products}
        onEdit={handleShowEdit}
        onDelete={handleDelete}
      />
    </>
  );
}

export default ManageProductsPage;
