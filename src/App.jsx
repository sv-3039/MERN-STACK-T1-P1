import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Partners from "./components/Partners";
import Footer from "./components/Footer";
import IndoorGames from "./components/IndoorGames";
import OutdoorGames from "./components/OutdoorGames";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Home />
              <Partners />
              <Footer />
            </>
          }
        />

        <Route
          path="/indoor-games"
          element={<IndoorGames />}
        />

        <Route
          path="/outdoor-games"
          element={<OutdoorGames />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;