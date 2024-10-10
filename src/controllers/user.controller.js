const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require('../utils/generateToken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ // Use 400 for bad request
        message: "All fields are required.",
      });
    }

    // Check if user already exists
    let userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ // Use 409 for conflict
        message: "User already exists with this email ID.",
      });
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

    return res.status(201).json({ message: "User created." }); // Use 201 for resource creation
  } catch (error) {
    return res.status(500).json({ // Use 500 for server errors
      message: error.message,
    });
  }
};

// const login = async (req,res) =>{
//     try {
//         let {email, password} = req.body;
//         if(email && password)
//         {

//         }
//         else
//         {
//             return 
//         }
//     } catch (error) {
//         return res.status(500).json({ // Use 500 for server errors
//             message: error.message,
//           });
//     }

// }

module.exports = {
  register,
};