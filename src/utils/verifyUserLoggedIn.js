const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const verifyUserLoggedIn = async (req) =>{
    if(!req.cookies.userToken)
    {
        return false;
    }
    else
    {
        try {
            let decodedData = jwt.verify(req.cookies.userToken, process.env.JWT_KEY);
            let user = await userModel
              .findOne({ email: decodedData.email })
              .select("-password");
        
              if (!user) {
                return false;
            }
            else
            {
                return true;
            }
            req.user = user;
          } catch (error) {
            return false;
          }
    }
}

module.exports = verifyUserLoggedIn;