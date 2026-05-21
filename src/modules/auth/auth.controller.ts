import type { Request, Response } from "express";

const signup = (req: Request, res: Response)=>{
    console.log("Auth controller")
}

export const signupcontroller = {signup}