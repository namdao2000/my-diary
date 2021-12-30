import { DiaryDataLayer } from '../data-layer/diary.data-layer';

export interface CreateDiaryPageArgs {
  username: string;
  content: string;
}

export const DiaryService = {
  createDiaryPage: async (args: CreateDiaryPageArgs) => {
    await DiaryDataLayer.createDiaryPage(args);
  },
};
