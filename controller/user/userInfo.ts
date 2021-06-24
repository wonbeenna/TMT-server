import { Request, Response } from 'express';

export const userInfoPost = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('유저인포포스트');
    }
    catch (err) {
        res.end();
    }
}

export const userInfoGet = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('유저인포겟');
    }
    catch (err) {
        res.end();
    }
}