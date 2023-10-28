import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Counter } from '@/entities/Counter';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Page data-testid="MainPage">
      <Counter />
      <div>{t('Главная страница')}</div>
    </Page>
  );
};

export default MainPage;
