import { Request, Response } from 'express';
export declare const userController: {
    createNew: (req: Request, res: Response) => Promise<void>;
    getUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
