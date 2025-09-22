import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { backendUrl, currency, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { token },
      });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      } else {
        console.log("Failed to fetch orders:", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Fetch orders error:", error.response ? error.response.data : error.message);
      toast.error(error.message || "Failed to load orders");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="border-t border-gray-200 pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex gap-6 items-start text-sm">
                <img
                  src={item.image?.[0]} // Fallback image
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date:{" "}
                    <span className="text-gray-400">
                      {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p
                    className={`min-w-2 h-2 rounded-full ${
                      item.status === "Order Placed" ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  ></p>
                  <p className="text-sm md:text-base">{item.status || "Unknown"}</p>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-2 border-gray-200 text-sm font-medium rounded-sm">
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;