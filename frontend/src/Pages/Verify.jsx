import React from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const navigate = useNavigate();
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success"); // true/false
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems();
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return <div></div>;
};

export default Verify;
