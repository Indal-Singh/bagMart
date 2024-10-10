const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const isLoggedIn = async (req, res, next) => {
    
  if (!req.cookies.userToken) {
    req.flash("error", "Please login first");
    return res.redirect("/");
  }
  try {
    let decodedData = jwt.verify(req.cookies.userToken, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decodedData.email })
      .select("-password");

      if (!user) {
        req.flash("error", "User not found.");
        return res.redirect("/"); // Redirect if user not found
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = {
    isLoggedIn
}