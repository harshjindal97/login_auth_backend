import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";

class UserController {
    static userRegistration = async (req, res) => {
        console.log(req.body)
        const { name, email, password, password_confirmation, tc } = req.body;
        const user = await userModel.findOne({ email: email });
        console.log(user)
        if (user) {
            res.send({ "status": "failed", "message": "mail already exixt" })
        } else {
            if (name && email && password && password_confirmation && tc) {
                if (password === password_confirmation) {
                    console.log("pass=conf")
                    try {
                        const salt = await bcrypt.genSalt(10);
                        // console.log(salt)
                        const hash_password = await bcrypt.hash(password, salt);
                        const doc = new userModel({
                            name: name,
                            email: email,
                            password: hash_password,
                            tc: tc
                        })
                        await doc.save()
                        console.log(doc)

                        const user_Id = await userModel.findOne({ email: email })

                        //in this place i'm creating token

                        const token = jwt.sign({ user_Id: user_Id._id }, process.env.JsonTokenKey, { expiresIn: '5d' })



                        res.send({ "status": "sucess", "token": token })
                    } catch (error) {
                        console.log(error)

                    }
                } else {
                    res.send({ "status": "failed", "message": "password not matched" })
                }
            } else {
                res.send({ "status": "failed", "message": "All felids are compulsary" })
            }
        }
    }

    static userLogin = async (req, res) => {

        const { email, password } = req.body;

        try {
            if (email && password) {
                const avail = await userModel.findOne({ email: email });

                if (avail != null) {
                    const isMatch = await bcrypt.compare(password, avail.password);

                    if (email === avail.email && isMatch) {
                        // const user_Id = await userModel.findOne({ email: email })

                        //in this place i'm creating token

                        const Tokenn = jwt.sign({ user_Id: avail._id }, process.env.JsonTokenKey, { expiresIn: '5d' })

                        // console.log(user_Id);
                        res.send({ "login": "sucessful", "token": Tokenn })
                    } else {
                        res.send({ "status": "failed", "message": "wrong email or password" })
                    }

                } else {
                    res.send({ "status": "failed", "message": "User doesnot exist" })
                }

            } else {
                res.send({ "status": "failed", "message": "All felids are compulsary" })
            }
        } catch (error) {
            console.log(error);
            res.send({ "status": "failed", "message": "unable to login" })
        }

    }


    static userChangePassword = async (req, res) => {

        const { password, password_confirmation } = req.body;

        if (password && password_confirmation) {
            if (password !== password_confirmation) {
                res.send({ "status": "failed", "message": "password not matched" })
            } else {
                const salt = await bcrypt.genSalt(10);
                const newHashPass = await bcrypt.hash(password, salt);
                await userModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPass } })
                res.send({ "status": "sucessful", "message": "password change sucessfully" })
            }
        } else {
            res.send({ "status": "failed", "message": "All felids are compulsary" })
        }

    }

    static loggedUser = async (req, res) => {
        res.send(req.user);
    }


    static passResetMail = async (req, res) => {
        const { email } = req.body;
        if (email) {
            const check = await userModel.findOne({ email: email })

            if (check) {
                const secretKey = check._id + process.env.JsonTokenKey;
                const token = jwt.sign({ "userId": "check._id" }, secretKey, { expiresIn: '15m' })

                const link = `http://127.0.0.1.3000/api/user/reset/${check._id}/${secretKey}`;
                console.log(link);
                res.send("password reset mail send sucessfully");

            } else {
                res.send("mail doesnot exist");
            }
        } else {
            res.send({ "message": "mail is required" });
        }
    }


}

export default UserController;