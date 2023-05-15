import express from 'express';
const router = express.Router();
import UserController from '../controller/usercontroller.js';
import checkUserAuth from '../middleware/middleware.js';

// public router

router.post("/register", UserController.userRegistration);

router.post("/login", UserController.userLogin);
router.post("/userChangePassword", checkUserAuth);
router.post("/userChangePassword", UserController.userChangePassword);


// private router



export default router;