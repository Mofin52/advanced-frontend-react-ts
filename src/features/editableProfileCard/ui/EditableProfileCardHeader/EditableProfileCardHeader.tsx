import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

interface EditableProfileCardHeaderProps {
    className?: string
}

export const EditableProfileCardHeader = memo(({ className }: EditableProfileCardHeaderProps) => {
  const { t } = useTranslation('profile');

  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);

  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <HStack max justify="between" className={classNames('', {}, [className])}>
      <Text title={t('Профиль')} />
      {canEdit && (
        <div>
          {readonly
            ? (
              <Button
                onClick={onEdit}
                theme={ButtonTheme.OUTLINE}
                data-testid="EditableProfileCardHeader.EditButton"
              >
                {t('Редактировать')}
              </Button>
            )
            : (
              <HStack gap="8">
                <Button
                  data-testid="EditableProfileCardHeader.CancelButton"
                  onClick={onCancelEdit}
                  theme={ButtonTheme.OUTLINE_RED}
                >
                  {t('Отменить')}
                </Button>
                <Button
                  data-testid="EditableProfileCardHeader.SaveButton"
                  onClick={onSave}
                  theme={ButtonTheme.OUTLINE}
                >
                  {t('Сохранить')}
                </Button>
              </HStack>
            )}
        </div>
      )}

    </HStack>
  );
});
