import { memo } from 'react';
import { classNames } from 'shared/lib/classnames/classNames';
import { useTranslation } from 'react-i18next';
import { Article, ArticleList, ArticleView } from 'entities/Article';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticleList
        isLoading
        view={ArticleView.BIG}
        articles={[]}
      />
    </div>
  );
};

export default memo(ArticlesPage);
