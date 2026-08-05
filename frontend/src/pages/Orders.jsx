import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Customer: {order.user}</h3>

            <p>📞 {order.phone}</p>

            <p>
              📍 {order.address}, {order.city},{" "}
              {order.state} - {order.pincode}
            </p>

            <p>
              💳 Payment : {order.paymentMethod}
            </p>

            <p>
              📦 Status :
              <span className="status">
                {order.status}
              </span>
            </p>

            <h4>Products</h4>

            {order.products.map((item, index) => (
              <div className="product-row" key={index}>
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                />

                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}

            <h2>Total : ₹{order.totalPrice}</h2>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;