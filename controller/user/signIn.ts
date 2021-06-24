import { Request, Response } from "express";


export const signIn = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('이틀? 하루면 충.분.하지')
    }
    catch (err) {
        res.end();
    }
}

