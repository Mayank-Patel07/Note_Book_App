const jwt = require('jsonwebtoken');
require("dotenv").config()

const fetchUserData = (req, res, next) => {

    // Getting a JWT token from the header
    const token = req.header('auth-token');
    // Checking if the token is valid
    if (!token) {
        res.status(401).send({ error: "Invalid token" })
    }

    try {
        // Verify the token with the help of the Token and  JWT Signature 
        const data = jwt.verify(token, process.env.JWT_SECRET_SIGH)
        // Getting the JWT token data in a object
        // Storing the token data in req object (req.userDataReq)
        req.userDataReq = data.user
        // console.log(data)
        // console.log(req.userDataReq)
        next()
    } catch (error) {
        res.status(401).send({ error: "Invalid token" })
    }
}

module.exports = fetchUserData;