import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/user";

class UserController {
    static userRegistration = async (req, res) => {
        const { name, email, password, password_confirmation, tc } = req.body;
        const user = await userModel.findOne({ email: email });
        if (user) {
            res.send({ "status": "failed", "message": "mail already exixt" })
        } else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hash_password = await bcrypt.hash(password, salt);
                        const doc = new userModel({
                            name: name,
                            email: email,
                            password: hash_password,
                            tc: tc
                        })
                    } catch (error) {

                    }
                } else {
                    res.send({ "status": "failed", "message": "password not matched" })
                }
            } else {
                res.send({ "status": "failed", "message": "All felids are compulsary" })
            }
        }
    }
}

export default UserController;