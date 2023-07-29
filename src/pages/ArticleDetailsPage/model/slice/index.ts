import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { ArticleDetailsPageSchema } from '../types';
import {
  articleDetailsPageRecommendationsReducer,
} from './articleDetailsPageRecommendationsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
  recommendations: articleDetailsPageRecommendationsReducer,
  comments: articleDetailsCommentsReducer,
});
