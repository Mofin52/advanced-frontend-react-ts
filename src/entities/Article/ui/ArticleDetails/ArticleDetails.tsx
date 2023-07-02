import { classNames } from 'shared/lib/classnames/classNames';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = ({ className, id }: ArticleDetailsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // const isLoading = useSelector(getArticleDetailsIsLoading);
  const isLoading = true;
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <div>
        <Skeleton width={200} height={200} border="50%" className={cls.avatar} />

        <Skeleton width={300} height={32} className={cls.title} />

        <Skeleton width={600} height={24} className={cls.skeleton} />

        <Skeleton width="100%" height={200} className={cls.skeleton} />

        <Skeleton width="100%" height={200} className={cls.skeleton} />
      </div>
    );
  } else if (error) {
    content = (
      <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')} />
    );
  } else {
    content = <div>ArticleDetails</div>;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>
  );
};
