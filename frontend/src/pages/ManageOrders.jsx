import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import "../styles/ManageOrders.css";

function ManageOrders() {
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

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });

      toast.success("Order Status Updated");

      fetchOrders();
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="manage-orders">

      <h1>Manage Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>

            <h3>{order.user}</h3>

            <p>📞 {order.phone}</p>

            <p>
              {order.address}, {order.city}, {order.state}
            </p>

            <h4>Total : ₹{order.totalPrice}</h4>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
            >
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>

          </div>
        ))
      )}

    </div>
  );
}

export default ManageOrders;