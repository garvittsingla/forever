import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart,cartItems } = useContext(ShopContext);

  const [productData, setProductData] = useState(false); // or NULL

  const [image, setImage] = useState("");

  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product images */}
        <div className="flex-1 flex gap-3">
          {/* ------ Thumbnails Section-------- */}
          <div className="flex flex-col gap-3 w-[20%] overflow-y-auto">
            {productData.image.map((item, index) => (
              <img
                src={item}
                onClick={() => setImage(item)}
                key={index}
                className="w-full cursor-pointer rounded border border-gray-300 hover:border-black transition"
              />
            ))}
          </div>

          {/* ----Main Image Section----- */}
          <div className="w-[80%]">
            <img
              src={image || productData.image[0]} // Fallback to the first image if 'image' is empty
              className="w-full h-auto rounded shadow"
            />
          </div>
        </div>
        {/* ----Product Info----- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          {/* -----Rating---- */}
          <div className="flex items-center gap-1 mt-2 ">
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_icon} className="w-3 5" />
            <img src={assets.star_dull_icon} className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          {/* ----Price---- */}
          <div>
            <p className="mt-5 text-3xl font-medium">
              {currency}
              {productData.price}
            </p>
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productData.description}
            </p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`border-1 border-gray-200 py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => addToCart(productData._id,size)} className="bg-black text-white font-medium px-8 py-3 text-sm active:bg-gray-700">
              ADD TO CART
            </button>
            <hr className="mt-8 opacity-55 bg-gray-200 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product</p>
              <p>Cash on Delivery is available on this product</p>
              <p>Easy return and exchange policy within 7 Days</p>
            </div>
          </div>
        </div>
      </div>
      {/* ------Description and review Section------ */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-200 px-5 py-3 text-sm ">Description</b>
          <b className="border border-gray-200 px-5 py-3 text-sm">Reviews(122)</b>
        </div>

        <div className="flex flex-col border-gray-200 gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Step into Forever, your ultimate online destination for timeless
            fashion. Whether you are looking for trendy everyday wear, elegant
            evening outfits, or wardrobe essentials, we have got it all.Welcome to Forever, where style meets sophistication. We are your one-stop destination for clothing that celebrates individuality, confidence, and creativity. From chic casuals to elegant formals, every piece in our collection is curated with care, ensuring you never have to compromise on quality or comfort.
          </p>
          <p>
            Shop with confidence and enjoy a seamless experience with secure
            payments, swift delivery, and top-notch customer service. Redefine
            your wardrobe and make every moment fashionable with Forever.
          </p>
        </div>
      </div>
      {/* -------- Display the Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
