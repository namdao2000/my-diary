import { DiaryDataLayer } from '../data-layer/diary.data-layer';
import {
  ErrorCode,
  getHttpErrorResponse,
  HttpError,
} from './http-error-response.service';

export interface CreateDiaryPageArgs {
  username: string;
  content: string;
}

export interface UpdateDiaryPageArgs {
  username: string;
  content: string;
  page_id: string;
}

export const DiaryService = {
  createDiaryPage: async (args: CreateDiaryPageArgs): Promise<void> => {
    await DiaryDataLayer.createDiaryPage(args);
  },
  updateDiaryPage: async (args: UpdateDiaryPageArgs): Promise<void> => {
    const diaryUser = await DiaryDataLayer.getDiaryPageUsername(args.page_id);
    if (!diaryUser || diaryUser !== args.username) {
      throw new HttpError(getHttpErrorResponse(ErrorCode.DIARY_PAGE_NON_EXISTENT));
    }
    await DiaryDataLayer.updateDiaryPage(args);
  },
};
