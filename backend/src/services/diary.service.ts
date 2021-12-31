import { DiaryDataLayer, DiaryPageSchema } from '../data-layer/diary.data-layer';
import {
  ErrorCode,
  getHttpErrorResponse,
  HttpError,
} from './http-error-response.service';

export interface DiaryPageContent {
  title: string;
  content: string;
}

export interface DiaryPageOwnership {
  username: string;
  page_id: string;
}

export interface CreateDiaryPageArgs extends DiaryPageContent {
  username: string;
}

export interface GetDiaryPagesArgs {
  username: string;
  limit: number;
  page: number;
}

export interface UpdateDiaryPageArgs extends DiaryPageContent, DiaryPageOwnership {}

export interface DeleteDiaryPageArgs extends DiaryPageOwnership {}

export interface GetOneDiaryPageArgs extends DiaryPageOwnership {}

export const DiaryService = {
  getOneDiaryPage: async (args: GetOneDiaryPageArgs): Promise<DiaryPageSchema> => {
    await DiaryService.validateDiaryPageOwnership({
      username: args.username,
      page_id: args.page_id,
    });
    return (await DiaryDataLayer.getOneDiaryPage(args.page_id)) as DiaryPageSchema;
  },
  getDiaryPages: async (
    args: GetDiaryPagesArgs,
  ): Promise<DiaryPageSchema[] | undefined> => {
    const offset = (args.page - 1) * args.limit;
    return await DiaryDataLayer.getDiaryPages(args.username, args.limit, offset);
  },
  getDiaryPagesCount: async (username: string): Promise<number> => {
    return await DiaryDataLayer.getDiaryPagesCount(username);
  },
  createDiaryPage: async (args: CreateDiaryPageArgs): Promise<void> => {
    await DiaryDataLayer.createDiaryPage(args);
  },
  updateDiaryPage: async (args: UpdateDiaryPageArgs): Promise<void> => {
    await DiaryService.validateDiaryPageOwnership({
      username: args.username,
      page_id: args.page_id,
    });
    await DiaryDataLayer.updateDiaryPage(args);
  },
  deleteDiaryPage: async (args: DeleteDiaryPageArgs): Promise<void> => {
    await DiaryService.validateDiaryPageOwnership({
      username: args.username,
      page_id: args.page_id,
    });
    await DiaryDataLayer.deleteDiaryPage(args.page_id);
  },
  validateDiaryPageOwnership: async (args: DiaryPageOwnership): Promise<void> => {
    const diaryUser = await DiaryDataLayer.getDiaryPageUsername(args.page_id);
    if (!diaryUser || diaryUser !== args.username) {
      throw new HttpError(getHttpErrorResponse(ErrorCode.DIARY_PAGE_NON_EXISTENT));
    }
  },
};
