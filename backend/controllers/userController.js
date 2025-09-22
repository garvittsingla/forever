import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (body) => {
    const payload = {
        _id: body._id,
        name: body.name,
        email: body.email
    }
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Please provide all the credentials" })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user);
        res.json({ success: true, token })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }


}

// Route for user Sign up
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.json({ success: false, message: "Please provide all the credentials" })
        }

        const alreadyExists = await userModel.findOne({ email });
        if (alreadyExists) {
            return res.json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong Password" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name, password: hashedPassword, email
        })

        const token = createToken(newUser);

        res.json({ success: true, token })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message })
    }


}


// Route for admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Please provide all the credentials" });
        }

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.json({ success: true, token });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};



export { loginUser, registerUser, adminLogin }