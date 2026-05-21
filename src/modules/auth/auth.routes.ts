import { Router } from "express";
import { signupcontroller } from "./auth.controller.js";

const router = Router();

router.post("/signup", signupcontroller.signup);

export const authrouter = router;
