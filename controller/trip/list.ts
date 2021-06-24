import { Request, Response } from 'express';

export const listPost = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('리스트포스트토스트');
    }
    catch (err) {
        res.end();
    }
}

export const listGet = async (req : Request, res : Response) : Promise<void> => {
    try {
        res.send('리스트겟');
    }
    catch (err) {
        res.end();
    }
}