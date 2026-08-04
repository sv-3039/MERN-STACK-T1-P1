import { Routes, Route } from "react-router-dom";
import SeatLayout from "../pages/seatlayout/SeatLayout";
import Home from "../pages/home/home";
import MovieDetails from "../pages/moviedetails/MovieDetails";
import SeatSelection from "../pages/seatselection/SeatSelection";
import Bookings from "../pages/bookings/Bookings";
import Checkout from "../pages/checkout/Checkout";
import Success from "../pages/success/Success";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/movie/:id/theatres" element={<SeatSelection />} />
      <Route path="/movie/:id/seats" element={<SeatLayout />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default AppRoutes;
