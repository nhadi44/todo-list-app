import React from "react";
import { Layout } from "./layouts/default";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Activity } from "./views/activity";
import { Items } from "./views/activity/items";

export const App = () => {
  return (
    <>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Activity />} />
            <Route path="/detail/:id" element={<Items />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
};
