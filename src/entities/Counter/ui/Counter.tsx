import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
  const { t } = useTranslation();
  const counterValue = useCounterValue();
  const { decrement, increment, add } = useCounterActions();
  const handleIncrement = () => {
    increment();
  };
  const handleDecrement = () => {
    decrement();
  };

  const handleAddFive = () => {
    add(5);
  };

  return (
    <div>
      <h1 data-testid="value-title">
        {counterValue}
      </h1>
      <Button data-testid="increment-button" onClick={handleIncrement}>{t('increment')}</Button>
      <Button data-testid="decrement-button" onClick={handleDecrement}>{t('decrement')}</Button>
      <Button data-testid="addfive-button" onClick={handleAddFive}>+5</Button>

    </div>
  );
};
