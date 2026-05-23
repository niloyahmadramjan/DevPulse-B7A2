import express, { type Request, type Response } from "express";
import { authrouter } from "./modules/auth/auth.routes.js";
import { issueRouter } from "./modules/issue/issue.routes.js";
import globalErrorHandler from "./middleware/globalerrorhandler.js";
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("server running..");
});
app.use("/api/auth", authrouter);
app.use("/api/issues", issueRouter);


app.use(globalErrorHandler)
export default app;
