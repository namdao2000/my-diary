import { NextFunction, Request, Response } from 'express';
import { DiaryService } from '../services/diary.service';

export const DiaryController = {
  get: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username } = res.locals;
      const { page_id } = req.params;

      const result = await DiaryService.getOneDiaryPage({ username, page_id });
      res.status(200).json(result);
      next();
    } catch (e) {
      next(e);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username } = res.locals;
      const page = req.query.page ?? 1;
      const limit = 15;
      const pageCount = await DiaryService.getDiaryPagesCount(username);
      const finalPage = Math.ceil(pageCount / limit);
      const result = await DiaryService.getDiaryPages({
        username,
        limit,
        page: parseInt(page as string),
      });
      res.status(200).json({
        pages: result,
        final_page: finalPage,
      });
      next();
    } catch (e) {
      next(e);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = res.locals;
    const { content, title } = req.body;
    try {
      await DiaryService.createDiaryPage({ username, title, content });
      res.status(201).json({
        message: 'Successfully created a new diary page!',
      });
      next();
    } catch (e) {
      next(e);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = res.locals;
    const { content, title } = req.body;
    const { page_id } = req.params;
    try {
      await DiaryService.updateDiaryPage({ username, title, content, page_id });
      res.status(200).json({
        message: 'Successfully updated the diary page',
      });
      next();
    } catch (e) {
      next(e);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = res.locals;
    const { page_id } = req.params;
    try {
      await DiaryService.deleteDiaryPage({ username, page_id });
      res.status(200).json({
        message: 'Successfully deleted the diary page',
      });
      next();
    } catch (e) {
      next(e);
    }
  },
};
