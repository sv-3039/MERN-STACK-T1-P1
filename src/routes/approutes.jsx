import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import MovieDetails from "../pages/MovieDetails/MovieDetails";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/movie/:id"
        element={<MovieDetails />}
      />

    </Routes>
  );
}

export default AppRoutes;