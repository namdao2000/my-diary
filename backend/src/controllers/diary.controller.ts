import { NextFunction, Request, Response } from 'express';

export const DiaryController = {
  get: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({
      content: 'I am so sad lmao, please help xD',
    });
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO:
  },
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO:
  },
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO:
  },
};
