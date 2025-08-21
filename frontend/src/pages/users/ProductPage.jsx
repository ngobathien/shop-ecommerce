import React, { useState } from "react";
import { fruitList } from "../../data";
import ProductCard from "../../components/Product/ProductCard";

function ProductPage() {
  const [index, setIndex] = useState(0);

  return (
    <>
      <h1>Product</h1>
      <ProductCard />
    </>
  );
}

export default ProductPage;
