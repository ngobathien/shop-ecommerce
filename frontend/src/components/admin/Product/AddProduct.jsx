import React, { useState } from "react";
// import Button from "../../Button";
import ProductForm from "./ProductForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AddProduct({ onSubmit, closeAdd, showAdd }) {
  return (
    <>
      {/* modal */}
      <Modal show={showAdd} onHide={closeAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sản phẩm mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* form  */}
          <ProductForm
            onSubmit={onSubmit}
            closeModal={closeAdd}
            initialValues={{}}
            mode="add"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddProduct;
