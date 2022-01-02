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
      const is_public = !!req.query.is_public;
      const limit = 15;
      const count = await DiaryService.getDiaryPagesCount(username);
      const final_page = Math.ceil(count / limit);
      const result = await DiaryService.getDiaryPages({
        is_public,
        username,
        limit,
        page: parseInt(page as string),
      });
      res.status(200).json({
        pages: result,
        count,
        limit,
        final_page,
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
      const result = await DiaryService.createDiaryPage({ username, title, content });
      res.status(201).json({
        message: 'Successfully created a new diary page!',
        page_id: result,
      });
      next();
    } catch (e) {
      next(e);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = res.locals;
    const { content, title, is_public } = req.body;
    const { page_id } = req.params;
    try {
      await DiaryService.updateDiaryPage({
        username,
        title,
        content,
        page_id,
        is_public: Boolean(is_public),
      });
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
