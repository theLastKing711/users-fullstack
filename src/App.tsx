import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pages } from "./utils/constants";

const pagesLinks = pages.map((item, index) => {
  return <Route path={item.url} element={<item.component key={index} />} />;
});

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>{pagesLinks}</Routes>
        </Container>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
