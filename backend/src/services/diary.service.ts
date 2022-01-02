import { DiaryDataLayer, DiaryPageSchema } from '../data-layer/diary.data-layer';
import {
  ErrorCode,
  getHttpErrorResponse,
  HttpError,
} from './http-error-response.service';

export interface GetPublicDiaryPagesArgs {
  limit: number;
  page: number;
}

export interface GetOnePublicDiaryPagesArgs {
  page_id: string;
}

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

export interface UpdateDiaryPageArgs extends DiaryPageContent, DiaryPageOwnership {
  is_public: boolean;
}

export interface DeleteDiaryPageArgs extends DiaryPageOwnership {}

export interface GetOneDiaryPageArgs extends DiaryPageOwnership {}

export const DiaryService = {
  getOnePublicDiaryPage: async (
    args: GetOnePublicDiaryPagesArgs,
  ): Promise<DiaryPageSchema> => {
    const result = await DiaryDataLayer.getOnePublicDiaryPage(args.page_id);
    if (!result) {
      throw new HttpError(getHttpErrorResponse(ErrorCode.DIARY_PAGE_NON_EXISTENT));
    }
    await DiaryDataLayer.incrementDiaryPageViewCount(args.page_id);
    return result;
  },
  getPublicDiaryPages: async (
    args: GetPublicDiaryPagesArgs,
  ): Promise<DiaryPageSchema[] | undefined> => {
    const offset = (args.page - 1) * args.limit;
    return await DiaryDataLayer.getPublicDiaryPages(args.limit, offset);
  },
  getOneDiaryPage: async (args: GetOneDiaryPageArgs): Promise<DiaryPageSchema> => {
    const result = await DiaryDataLayer.getOneDiaryPage(args.page_id);

    if (!result || result.username !== args.username) {
      throw new HttpError(getHttpErrorResponse(ErrorCode.DIARY_PAGE_NON_EXISTENT));
    }
    return result;
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
  getPublicDiaryPagesCount: async (): Promise<number> => {
    return await DiaryDataLayer.getPublicDiaryPagesCount();
  },
  createDiaryPage: async (args: CreateDiaryPageArgs): Promise<string> => {
    return await DiaryDataLayer.createDiaryPage(args);
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
    const result = await DiaryDataLayer.getDiaryPagePermission(args.page_id);
    if (!result || result.username !== args.username) {
      throw new HttpError(getHttpErrorResponse(ErrorCode.DIARY_PAGE_NON_EXISTENT));
    }
  },
};
