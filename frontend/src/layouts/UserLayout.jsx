import React from "react";
import Header from "../components/user/Header";
import { Outlet } from "react-router";

function UserLayout() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "70px" }}>
        <Outlet />
      </main>
    </>
  );
}

export default UserLayout;
