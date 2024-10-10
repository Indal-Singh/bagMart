const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require('../utils/generateToken');


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      req.flash("error", "All fields are required.");
      return res.redirect("/"); // Redirect to the registration page
    }

    // Check if user already exists
    let userExist = await userModel.findOne({ email });
    if (userExist) {
      req.flash("error", "User already exists with this email ID.");
      return res.redirect("/"); // Redirect to the registration page
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new user
    let user = await userModel.create({
      fullname: name,
      email,
      password: hash,
    });

    // Create JWT token
    let token = generateToken(user);
    res.cookie("userToken", token, { httpOnly: true }); // Consider setting HttpOnly for security
    req.flash("success", "Registration successful!"); // Flash success message
    return res.redirect('/shop');
  } catch (error) {
    req.flash("error", "Internal server error.");
    return res.redirect("/"); // Redirect to the registration page
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "All fields are required.");
      return res.redirect("/"); // Redirect to the login page
    }

    // Checking if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "User does not exist.");
      return res.redirect("/"); // Redirect to the login page
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      req.flash("error", "Invalid credentials.");
      return res.redirect("/"); // Redirect to the login page
    }

    // Generate a token
    const token = generateToken(user);
    res.cookie("userToken", token, { httpOnly: true });
    req.flash("success", "Login successful!"); // Flash success message
    return res.redirect('/shop');
    
  } catch (error) {
    req.flash("error", "Internal server error.");
    return res.redirect("/"); // Redirect to the login page
  }
};

module.exports = {
  register,
  login
};