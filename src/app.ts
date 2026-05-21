import express, { type Request, type Response } from "express"
import { authrouter } from "./modules/auth/auth.routes.js"
const app = express()



app.get("/", (req: Request, res: Response)=>{
    res.send("server running..")
})
app.use("/api/auth", authrouter)

export default app;