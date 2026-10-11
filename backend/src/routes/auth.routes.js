const { Router } = require("express");
const { registerUser, loginUser, logoutUser, getUserInfo } = require("../controller/auth.Controller");
const { authUserMiddleware }  = require("../middleware/auth.middleware");

const authRouter = Router();

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.get("/logout", logoutUser)

authRouter.get("/get-me", authUserMiddleware ,getUserInfo)



module.exports = authRouter     