import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.headers.token; // Read from 'token' header
  console.log("Received token:", token);

  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", token_decode);

    if (!token_decode._id) {
      console.log("ok")
      console.log("Invalid token: Missing _id");
      return res.json({ success: false, message: "Invalid token: Missing _id" });
    }

    req.user = token_decode; // Attach decoded token to req.user
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.json({ success: false, message: "Invalid token" });
  }
};

export default authUser;