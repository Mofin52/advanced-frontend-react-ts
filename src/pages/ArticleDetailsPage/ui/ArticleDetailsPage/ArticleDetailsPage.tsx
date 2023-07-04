import { classNames } from 'shared/lib/classnames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment/ui/CommentList/CommentList';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
  fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation();

  const { id } = useParams<{id: string}>();

  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleCommentsIsLoading);

  const dispatch = useDispatch();

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  if (!id) {
    return <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>{t('Статья не найдена')}</div>;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text title={t('Комментарии')} className={cls.commentTitle} />
        <CommentList
          isLoading={isLoading}
          comments={comments}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
