import jwt from 'jsonwebtoken'
import userModel from '../models/user.js'
import dotenv from 'dotenv';

var checkUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        // console.log("inside");
        try {
            // Get Token from header
            token = authorization.split('  ')[1]

            // Verify Token
            // console.log(token)
            const { user_Id } = jwt.verify(token, process.env.JsonTokenKey)

            console.log(user_Id);

            // Get User from Token
            req.user = await userModel.findById(user_Id).select('-password')
            // console.log(req.user);
            next()
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unauthorized User" })
        }
    }
    if (!token) {
        res.send({ "status": "failed", "message": "Unauthorized User, No Token" })
    }
}

export default checkUserAuth