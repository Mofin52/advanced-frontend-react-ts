import { classNames } from 'shared/lib/classnames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo(({ className, isLoading, comments }: CommentListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentList, {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {
          comments?.length
            ? comments.map((comment) => (
              <CommentCard
                comment={comment}
                className={cls.comment}
                isLoading={isLoading}
              />
            ))
            : <Text text={t('Комментарии отсутствуют')} />
      }
    </div>
  );
});
