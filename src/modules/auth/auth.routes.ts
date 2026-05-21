import { Router } from "express";
import { signupController } from "./auth.controller.js";

const router = Router();

router.post("/signup", signupController.signup);
router.post("/login", signupController.login);


export const authrouter = router;
