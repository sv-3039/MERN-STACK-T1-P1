import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="container py-5">
      <div className="card shadow text-center p-5">
        <h1 className="text-success mb-3">
          ✅ Order Placed Successfully!
        </h1>

        <p className="lead">
          Thank you for shopping with Book Stall.
        </p>

        <Link to="/" className="btn btn-primary mt-3">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;