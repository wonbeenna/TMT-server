import { Request, Response } from 'express';

export const recommend = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('리커멘드');
    }
    catch (err) {
        res.end();
    }
}