import { Request, Response } from 'express';

export const search = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('서치');
    }
    catch (err) {
        res.end();
    }
}