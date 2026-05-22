import { Router } from "express";
import { issueController } from "./issue.controller.js";
import isAuth from "../../middleware/auth.js";
import { USER_ROLE } from "../../types/role.types.js";

const router = Router();
// create issue
router.post("/", isAuth(USER_ROLE.contributor, USER_ROLE.maintainer), issueController.issueCreate);
// get all issue 
router.get("/", issueController.getAllIssues);
// get single issue use id
router.get("/:id", issueController.getSingleIssue)
// update issue
router.patch("/:id",isAuth(USER_ROLE.contributor, USER_ROLE.maintainer), issueController.updateIssue)

export const issueRouter = router;
