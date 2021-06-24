import { Request, Response } from 'express';

export const deleteSpot = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('딜리트스팟');
    }
    catch (err) {
        res.end();
    }
}