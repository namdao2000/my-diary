import { Router } from 'express';
import { DiaryController } from '../controllers/diary.controller';
import { authTokenGuard } from '../middleware/token-verficiation.middleware';

export const DiaryRouter = Router();
DiaryRouter.get('/diary', authTokenGuard, DiaryController.getAll);
DiaryRouter.get('/diary/:page_id', authTokenGuard, DiaryController.get);
DiaryRouter.post('/diary', authTokenGuard, DiaryController.create);
DiaryRouter.put('/diary/:page_id', authTokenGuard, DiaryController.update);
DiaryRouter.delete('/diary/:page_id', authTokenGuard, DiaryController.delete);
