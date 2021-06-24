import { Request, Response } from 'express';

export const signUp = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('사인업');
    }
    catch (err) {
        res.end();
    }
}