import { v2 as cloudinary } from "cloudinary";
import uploadOnCloudinary from "../config/cloudinary.js";
import productModel from "../models/productModels.js";


// function to add a Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestseller,
    } = req.body;
    const sizes = JSON.parse(req.body.sizes); // Parse sizes if sent as a JSON string

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined); // takes only those images which are not undefined

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await uploadOnCloudinary(item.path); // Use item.path for multer files
        return result;
      })
    );

    // Save to database
    const productData = new productModel({
      name,
      description,
      price: Number(price), // becase we will take this as string from body
      image: imagesUrl,
      category,
      subCategory,
      sizes: Array.isArray(sizes) ? sizes : [sizes], // Ensure sizes is an array
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    });

    await productData.save();

    res.json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


// function for list the products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products })

  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }

}

// function to remove the product
const removeProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    if (!productId) {
      return res.json({
        success: false,
        message: "Please provide an id to remove the product",
      });

    }
    const deleted = await productModel.findByIdAndDelete(productId)
    if (!deleted) {
      return res.json({
        success: false,
        message: "Product cann;t be removed",
      });
    }
    res.json({ success: true, message: "Product removed successfully" })
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }

}

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.json({
        success: false,
        message: "Please provide an id to remove the product",
      });
    }

    const product = await productModel.findById(productId)

    res.json({ success: true, product })
  }
  catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }

}



export { addProduct, removeProduct, listProducts, singleProduct }