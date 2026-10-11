const userModle = require("../models/user.model");
const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const tokenBlackListSchema = require("../models/blacklist.modle");


const registerUser = async (req, res) => {
    console.log(req.body)

    const { username, email, password } = req.body;


    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserExisted = await userModle.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserExisted) {
        return res.status(400).json({
            message: "user alredy exists with this username or email"
        })
    }

    const hash = await brcypt.hash(password, 10);

    const user = await userModle.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })


}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModle.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "User not found with this email"
        })
    }

    const isPasswordValid = await brcypt.compare(
        password,
        user.password
    )

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email and password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    res.cookie("token", token);


    res.status(201).json({
        message: "User LogedIn Successfully",
        user: {
            userId: user._id,
            username: user.username,
            email: user.email
        }
    })
}


const logoutUser = async (req, res) => {
    const token = req.cookies.token

    if(token){
        await tokenBlackListSchema.create({token})
    }

    res.clearCookie("token");

    res.status(200).json({
        message:"User LoggedOut Seccessfully "
    })
}

const getUserInfo = async(req,res) => {

   const user= await userModle.findOne(req.user.id);

    res.status(200).json({
        message:"User details fetched successfully. ",
        user:{
            id: user._id,
            username:user.username,
            email : user.email
        }
    })
    
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserInfo
}