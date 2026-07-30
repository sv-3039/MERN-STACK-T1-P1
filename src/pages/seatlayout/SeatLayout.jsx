import "./SeatLayout.css";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";

function SeatLayout() {

    const { id } = useParams();

    return (
        <>
            <Navbar />

            <div className="seat-layout">

                <h1>Seat Selection</h1>

                <p>Movie ID : {id}</p>

                <h3>Screen This Way</h3>

            </div>
        </>
    );
}

export default SeatLayout;