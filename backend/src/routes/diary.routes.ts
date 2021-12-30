import { Router } from 'express';
import { DiaryController } from '../controllers/diary.controller';
import { authTokenGuard } from '../middleware/token-verficiation.middleware';

export const DiaryRouter = Router();
DiaryRouter.get('/diary', authTokenGuard, DiaryController.get);
DiaryRouter.get('/diary/:id', authTokenGuard, DiaryController.get);
DiaryRouter.post('/diary', authTokenGuard, DiaryController.create);
DiaryRouter.put('/diary/:id', authTokenGuard, DiaryController.update);
DiaryRouter.delete('/diary/:id', authTokenGuard, DiaryController.delete);
