import { classNames } from 'shared/lib/classnames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';

import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextSize } from 'shared/ui/Text/Text';

import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border="50%" />
          <Skeleton height={16} width={100} className={cls.username} />
        </div>
        <Skeleton width="100%" height={50} className={cls.text} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        {comment.user.avatar ? <Avatar src={comment.user.avatar} size={30} /> : null}
        <Text size={TextSize.L} text={comment.user.username} className={cls.username} />
      </div>
      <Text text={comment.text} className={cls.text} />
    </div>
  );
});