import { NextFunction, Request, Response } from 'express';
import { DiaryService } from '../services/diary.service';

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
  ): Promise<void> => {
    const { username } = res.locals;
    const { content } = req.body;
    try {
      await DiaryService.createDiaryPage({ username, content });
      res.status(201).json({
        message: 'Successfully created a new diary page!',
      });
      next();
    } catch (e) {
      next(e);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO:
  },
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // TODO:
  },
};
