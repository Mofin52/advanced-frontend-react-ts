import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { StarRating } from '@/shared/ui/StarRating';
import { Modal } from '@/shared/ui/Modal';
import { Input } from '@/shared/ui/Input';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?:(startCount: number) => void;
    onAccept?:(starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo(({
  className, title, feedbackTitle, hasFeedback, onAccept, onCancel, rate = 0,
}: RatingCardProps) => {
  const { t } = useTranslation();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onSelectStars = useCallback((selectedStarsCount: number) => {
    setStarsCount(selectedStarsCount);
    if (hasFeedback) {
      setIsModalOpened(true);
    } else {
      onAccept?.(selectedStarsCount);
    }
  }, [hasFeedback, onAccept]);

  const handleAccept = useCallback(() => {
    setIsModalOpened(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const handleCancel = useCallback(() => {
    setIsModalOpened(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')} />
    </>
  );

  return (
    <Card max className={classNames('', {}, [className])}>
      <VStack align="center" gap="8" max>
        <Text title={starsCount ? t('Спасибо за оценку') : title} />
        <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpened} lazy>
          <VStack max gap="32">
            {modalContent}
            <HStack max gap="16" justify="end">
              <Button theme={ButtonTheme.OUTLINE_RED} onClick={handleCancel}>{t('Закрыть')}</Button>
              <Button onClick={handleAccept}>{t('Отправить')}</Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpened} lazy onClose={handleCancel}>
          <VStack gap="32">
            {modalContent}
            <Button fullWidth size={ButtonSize.L} onClick={handleAccept}>{t('Отправить')}</Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
});
