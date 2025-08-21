import React from "react";
import { Link } from "react-router";
import Header from "../../components/user/Header";
import ProductPage from "./ProductPage";

const HomePage = () => {
  return (
    <>
      <h1>Trang chủ</h1>

      <ProductPage />
    </>
  );
};

export default HomePage;
