import React, { useState } from "react";
import ProductForm from "./ProductForm";
import Modal from "react-bootstrap/Modal";

function EditProduct({ closeEdit, showEdit, product, onSubmit }) {
  return (
    <>
      {/* modal */}
      <Modal show={showEdit} onHide={closeEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* form  */}
          <ProductForm
            initialValues={product}
            onSubmit={onSubmit}
            closeModal={closeEdit}
            mode="edit"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditProduct;
