import { Request, Response } from 'express';

export const myPage = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('마이페이지');
    }
    catch (err) {
        res.end();
    }
}