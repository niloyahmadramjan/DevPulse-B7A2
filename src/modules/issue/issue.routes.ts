import { Router } from "express";
import { issueController } from "./issue.controller.js";

const router = Router();

router.post("/", issueController.issueCreate);


export const issueRouter = router;
