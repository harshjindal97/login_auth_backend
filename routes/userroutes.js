import express from 'express';
const router = express.Router();
import UserController from '../controller/usercontroller.js';
import checkUserAuth from '../middleware/middleware.js';

// public router

router.post("/register", UserController.userRegistration);
router.get("/loggeduser", checkUserAuth);
router.post("/resetPasswordMail", UserController.passResetMail)

router.post("/login", UserController.userLogin);
router.post("/userChangePassword", checkUserAuth);
router.post("/userChangePassword", UserController.userChangePassword);
router.get("/loggedUser", UserController.loggedUser);


// private router



export default router;