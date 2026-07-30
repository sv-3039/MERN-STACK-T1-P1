import { Routes, Route } from "react-router-dom";
import SeatLayout from "../pages/seatlayout/SeatLayout";
import Home from "../pages/home/home";
import MovieDetails from "../pages/moviedetails/MovieDetails";
import SeatSelection from "../pages/seatselection/SeatSelection";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/movie/:id/theatres" element={<SeatSelection />} />
      <Route path="/movie/:id/seats" element={<SeatLayout />} />
    </Routes>
  );
}

export default AppRoutes;
