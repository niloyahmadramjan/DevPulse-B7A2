import { Router } from "express";
import { issueController } from "./issue.controller.js";
import isAuth from "../../middleware/auth.js";
import { USER_ROLE } from "../../types/role.types.js";

const router = Router();

router.get("/", issueController.getAllIssues);
router.post("/", isAuth(USER_ROLE.contributor, USER_ROLE.maintainer), issueController.issueCreate);

export const issueRouter = router;
