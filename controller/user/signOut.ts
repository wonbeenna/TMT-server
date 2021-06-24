import { Request, Response } from 'express';

export const signOut = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('사인아웃');
    }
    catch (err) {
        res.end();
    }
}