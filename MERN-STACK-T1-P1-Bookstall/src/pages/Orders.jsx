import React from "react";

function Orders() {
  return (
    <div className="container mt-5">
      <div className="card shadow p-5 text-center">

        <h2 className="mb-4">
          📦 My Orders
        </h2>

        <p className="text-muted">
          You haven't placed any orders yet.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
          alt="Orders"
          width="220"
          className="my-4"
        />

        <button
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default Orders;