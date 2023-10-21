const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUserData = require('../Middleware/fetchUserData');
require("dotenv").config()


// Route 1 Creating a User using POST . /api/auth NO login is required ...

router.post('/',
    //  Adding a validation
    [body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a valid password").isLength({ min: 5 })], async (req, res) => {
        // console.log(req.body)
        // Check if there is an error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ errors: "Sorry a user with this email is already register" });
            }
            // Generating a Salt 
            const salt = await bcrypt.genSaltSync(10);

            // Generating a Password Hash 

            const secure_Password = await bcrypt.hashSync(req.body.password, salt)

            // Saving a User in the database 
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secure_Password,
            })

            const data = {
                user: {

                    id: user.id
                }
            }
            // Generating a JWT token with a data object and JWT Secrect
            const JWT_TOKEN = jwt.sign(data, process.env.JWT_SECRET_SIGH);
            res.json({ JWT_TOKEN })
            // res.json(`${req.body.name}  Registration Succesfully`)
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error")
        }
    })


// Route 2 Login in a User using POST . /api/auth/login NO login is required...

router.post('/login',
    //  Adding a validation
    [body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()], async (req, res) => {
        // console.log(req.body)

        // Check if there is an error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Try to login in with correct Credential" });
        }

        try {
            let { email, password } = req.body
            // Check if user is already register or not 
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ errors: "Sorry email is not register" });
            }
            // Comparing a  password that is requested (Enter by a client) by user and  data base hash password 
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                return res.status(400).json({ errors: "Login with correct Credentials" });
            }
            const data = {
                user: {

                    id: user.id
                }
            }
            // Generating a JWT token with a data object and JWT Secrect
            const JWT_TOKEN = jwt.sign(data, process.env.JWT_SECRET_SIGH);
            res.json({ JWT_TOKEN })
        }
        catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error")
        }
    })

// Route 3 Get logged in User details using POST . /api/auth/getuser login is required...

router.post('/getuser', fetchUserData, async (req, res) => {
    try {
        // console.log(req.userDataReq.id)
        const user = await User.findById(req.userDataReq.id).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router