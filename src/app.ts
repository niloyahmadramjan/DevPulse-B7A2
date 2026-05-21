import express, { type Request, type Response } from "express"
const app = express()



app.use("/", (req: Request, res: Response)=>{
    res.send("server running..")
})

export default app;