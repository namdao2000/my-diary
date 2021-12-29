import { Router } from 'express';
import { DiaryController } from '../controllers/diary.controller';

export const DiaryRouter = Router();
DiaryRouter.get('/diary', DiaryController.get);
DiaryRouter.post('/diary', DiaryController.create);
DiaryRouter.put('/diary', DiaryController.update);
DiaryRouter.delete('/diary', DiaryController.delete);
