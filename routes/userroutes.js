import express from 'express';
const router = express.Router();
import UserController from '../controller/usercontroller.js';

// public router

router.post("/register", UserController.userRegistration)


// private router



export default router;