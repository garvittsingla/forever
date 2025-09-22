import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" />
          <p className="text-gray-600 w-full md:w-2/3 ">
  Discover quality products crafted with care and precision. Stay connected for exclusive updates, offers, and insights tailored just for you.Innovation meets elegance—welcome to the future.
</p>
        </div>
        <div>
          <p className="font-medium text-xl mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl mb-5 font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-988-768-8656</li>
            <li>goyalketan1317@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border-none h-[1px] bg-gray-200" />

        <p className="py-5 text-sm text-center text-gray-500 border-t border-gray-200">
          &copy; 2025{" "}
          <a
            href="https://github.com/Ketan1317"
            className="hover:underline hover:text-black transition"
          >
            Forever.com
          </a>{" "}
          - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
