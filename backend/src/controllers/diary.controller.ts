import { NextFunction, Request, Response } from 'express';

export interface createDiaryArgs {
  content: string;
}

export const DiaryController = {
  get: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json({
      content: 'I am so sad lmao, please help xD',
    });
  },
  create: async (
    req: Request<{}, {}, createDiaryArgs>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {},
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO:
  },
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO:
  },
};
