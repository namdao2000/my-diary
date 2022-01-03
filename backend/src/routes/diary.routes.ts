import { Router } from 'express';
import { DiaryController } from '../controllers/diary.controller';
import { authTokenGuard } from '../middleware/token-verficiation.middleware';
import { body } from 'express-validator';
import { validateResult } from '../middleware/validate-result.middleware';

export const DiaryRouter = Router();
DiaryRouter.get('/public/diary', DiaryController.getAllPublic);
DiaryRouter.get('/public/diary/:page_id', DiaryController.getPublic);
DiaryRouter.get('/diary', authTokenGuard, DiaryController.getAll);
DiaryRouter.get('/diary/:page_id', authTokenGuard, DiaryController.get);
DiaryRouter.post(
  '/diary',
  authTokenGuard,
  body('title')
    .exists()
    .withMessage('required')
    .isLength({ max: 50 })
    .withMessage('Must be less than 50 characters long.'),
  body('content').exists().withMessage('required'),
  validateResult,
  DiaryController.create,
);
DiaryRouter.put(
  '/diary/:page_id',
  authTokenGuard,
  body('title')
    .exists()
    .withMessage('required')
    .isLength({ max: 50 })
    .withMessage('Must be less than 50 characters long.'),
  body('content').exists().withMessage('required'),
  body('is_public').exists().withMessage('required'),
  validateResult,
  DiaryController.update,
);
DiaryRouter.delete('/diary/:page_id', authTokenGuard, DiaryController.delete);
