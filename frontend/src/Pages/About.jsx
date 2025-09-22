import React from "react";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../Components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="border-t border-gray-200 pt-8 text-2xl text-center">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className="w-full md:max-w-[450px]" alt="About Us" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Welcome to Forever, your one-stop destination for the latest fashion trends and quality apparel.
            We are passionate about providing clothing that resonates with your style and fits your needs.
          </p>
          <p>
            At Forever, we believe in delivering not just products but experiences. From our thoughtfully
            curated collections to our excellent customer service, every aspect is designed with you in mind.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to make fashion accessible and enjoyable for everyone. We strive to bring you the
            best in quality, comfort, and style while keeping sustainability and affordability at the forefront.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 border-gray-200 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We take pride in the quality of our products. Every piece of clothing goes through rigorous
            quality checks to ensure that it meets our high standards.
          </p>
        </div>
        <div className="border px-10 border-gray-200 py-8 sm:py-20 flex flex-col gap-5">
          <b>Trendy Collections</b>
          <p className="text-gray-600">
            Stay ahead of the fashion curve with our regularly updated collections that reflect the latest
            trends and styles.
          </p>
        </div>
        <div className="border px-10 border-gray-200 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Service</b>
          <p className="text-gray-600">
            Our dedicated customer service team is here to assist you at every step of your shopping journey,
            ensuring a smooth and delightful experience.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
