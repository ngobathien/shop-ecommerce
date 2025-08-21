import React from "react";
import useProducts from "../../hooks/useProducts";
import { Link } from "react-router-dom";

function ProductCard() {
  const { products } = useProducts();

  return (
    <div className="container my-5">
      <div className="row g-4 justify-content-center">
        {products.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.nameProduct}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{product.nameProduct}</h5>
                <p className="card-text text-truncate">{product.description}</p>
                <div className="mt-auto">
                  <p className="text-muted mb-1">{product.category}</p>
                  <p className="fw-bold fs-5 text-primary">
                    {product.price} VND
                  </p>
                  <div className="d-grid gap-2 d-md-flex justify-content-between mt-3">
                    <button className="btn btn-primary flex-grow-1">
                      Mua ngay
                    </button>
                    <button className="btn btn-outline-primary flex-grow-1">
                      <i className="bi bi-cart-plus"></i> Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
