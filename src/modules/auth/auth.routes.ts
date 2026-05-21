import { Router } from "express";
import { signupController } from "./auth.controller.js";

const router = Router();

router.post("/signup", signupController.signup);

export const authrouter = router;
