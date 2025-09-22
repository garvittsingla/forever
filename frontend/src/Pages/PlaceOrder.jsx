import React, { useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const [loading,setLoading] = useState(false)

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in to place an order");
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[items][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      console.log("Sending orderData to Stripe:", orderData);

      switch (method) {
        case "cod": {
          setLoading(true)
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data?.success) {
            toast.success(response.data.message);
            setCartItems({});
            setLoading(false)
            navigate("/orders");
          } else {
            toast.error(response.data?.message || "Failed to place order");
          }
          break;
        }

        case "stripe": {
          toast.error("Stripe payment is not implemented yet")
          // const responseStripe = await axios.post(
          //   `${backendUrl}/api/order/stripe`,
          //   orderData,
          //   { headers: { token } }
          // );
          // if (responseStripe.data?.success) {
          //   const { session_url } = responseStripe.data;
          //   if (session_url) {
          //     window.location.replace(session_url);
          //   } else {
          //     toast.error("Invalid session URL received from Stripe");
          //     console.error("Stripe response:", responseStripe.data);
          //   }
          // } else {
          //   toast.error(responseStripe.data?.message || "Failed to initiate Stripe payment");
          //   console.error("Stripe error response:", responseStripe.data);
          // }
          break;
        }

        case "razorpay": {
          toast.error("Razorpay payment is not implemented yet");
          break;
        }

        default: {
          break;
        }
      }
    } catch (error) {
      console.error("Order submission error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex border-gray-200 flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-5">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Email address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="ZIP Code"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone"
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex border border-gray-300 items-center gap-4 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border-gray-300 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.stripe_logo || "/placeholder-logo.png"}
                className="h-5 mx-4"
                alt="Stripe"
              />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center border-gray-300 gap-4 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border-gray-300 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.razorpay_logo || "/placeholder-logo.png"}
                className="h-5 mx-4"
                alt="Razorpay"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center border-gray-300 gap-4 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
        type="submit"
        className={`text-white bg-black px-16 text-sm py-3 transition-colors duration-300 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black cursor-pointer hover:bg-gray-800"
        }`}
        disabled={loading}
      >
        {loading ? "ADDING 🛒" : "ADD"}
      </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;