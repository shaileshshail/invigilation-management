const express =require("express");

const router =express.Router();
const validateToken = require("../middleware/validateTokenHandler");

const {
    loginUser,
    logoutUser,
    currentUser,
    handleRefreshToken,
} = require("../controllers/authController");


router.post("/login",loginUser);

router.get("/logout",logoutUser);

router.get("/currentuser",validateToken,currentUser);

router.get("/refresh",handleRefreshToken);


module.exports =router;