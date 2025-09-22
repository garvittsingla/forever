import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Global variables
const deliveryCharge = 10;

// Placing order using COD method
const placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { items, amount, address } = req.body;

        if (!items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        const newOrder = await orderModel.create({
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }); // create the order in db

        await userModel.findByIdAndUpdate(userId, { cartData: {} }); // Reset the Cart after Placing the order

        res.json({ success: true, message: "Order Placed", orderId: newOrder._id });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

// All orders Data for admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};

// All orders Data for fuckin user
const userOrders = async (req, res) => {
    try {
        const userId = req.user._id;

        const orders = await orderModel.find({ userId });
        // if there are not prev orders
        if (!orders || orders.length === 0) {
            return res.json({ success: true, orders: [] });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Get user orders error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// Update the Order Status from admin Panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Status updated" });
    } catch (error) {
        console.error("Get user orders error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

export {
    allOrders,
    placeOrder,
    updateStatus,
    userOrders,
};