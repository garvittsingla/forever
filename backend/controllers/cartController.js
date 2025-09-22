import userModel from "../models/userModel.js";

// Add to products to user cart
const addToCart = async (req, res) => {
  console.log("addToCart called with:", req.body);
  try {
    const userId = req.user._id;
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      console.log("Missing itemId or size in request body");
      return res.json({ success: false, message: "Item ID and size are required" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      console.log("User not found for ID:", userId);
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    console.log("Cart updated successfully for user:", userId);
    return res.json({ success: true, message: "Added To Cart" });

  } catch (error) {
    console.error("Add to cart error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Update the User Cart
const updateCart = async (req, res) => {

  try {
    const userId = req.user._id; 
    const { itemId, size, quantity } = req.body; 

  
    if (!itemId || !size || quantity === undefined) {
      console.log("Missing itemId, size, or quantity in request body");
      return res.json({ success: false, message: "Item ID, size, and quantity are required" });
    }

    const userData = await userModel.findById(userId);

    if (!userData) {
      console.log("User not found for ID:", userId);
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { $set: { cartData } });

    return res.json({ success: true, message: "Cart Updated" });

  } catch (error) {
    console.error("Update cart error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Get User Cart Data
const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id; 
    console.log("i am in getUserCart")

    const userData = await userModel.findById(userId);
    
    if (!userData) {
      console.log("User not found for ID:", userId);
      return res.json({ success: false, message: "User not found" });
    }
    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get cart error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export { addToCart, getUserCart, updateCart };