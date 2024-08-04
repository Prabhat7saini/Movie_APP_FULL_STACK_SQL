const jwt = require("jsonwebtoken");
require("dotenv").config();
// const User = require("../models/User");


exports.auth = async (req, res, next) => {
    try {
       
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorization").replace("Bearer ", "");;
            console.log(req.header("Authorization").replace("Bearer ", ""))

        if (!token) {
            return res.status(401).json({ success: false, message: `Token Missing` });
        }

        try {
            
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode,"decode");
            
            req.user = decode;
        } catch (error) {
            
            return res
                .status(401)
                .json({ success: false, message: "token is invalid" });
        }

       
        next();
    } catch (error) {
        
        return res.status(401).json({
            success: false,
            message: `Something Went Wrong While Validating the Token - ${error.message}`,
        });
    }
};