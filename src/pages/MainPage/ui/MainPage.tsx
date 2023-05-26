import React from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from 'entities/Counter';

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div>{t('Главная страница')}</div>
    </div>
  );
};

export default MainPage;
