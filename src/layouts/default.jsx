import React from "react";
import { TodoComponents } from "../components";

export const Layout = ({ children }) => {
  return (
    <>
      <TodoComponents.Navbar />
      <main className="container py-5">{children}</main>
    </>
  );
};
