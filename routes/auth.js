const express=require("express");
const { validateSchema, signUPSchema, LoginSchema } = require("../utils/ValidationSchema/userSchema");
const { signup, login } = require("../controllers/auth");
const router=express.Router();





router.post('/signup',validateSchema(signUPSchema),signup);

router.post('/login',validateSchema(LoginSchema),login)



module.exports = router;