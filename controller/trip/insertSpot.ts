import { Request, Response } from 'express';

export const insertSpot = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('인설트스팟');
    }
    catch (err) {
        res.end();
    }
}