import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center px-4">
      <p className="font-medium text-2xl">Subscribe now & get 20% off</p>
      <p className="text-gray-500 mt-3">
        Stay updated with exclusive deals, the latest trends, and special offers delivered straight to your inbox.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-4 mt-4 mx-auto"
      >
        <input
          required
          className="w-full sm:flex-1 outline-none border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black"
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-6 cursor-pointer py-2 rounded hover:bg-gray-800 transition"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
