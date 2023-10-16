import { StoryFn } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line alexvelix-eslint-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (Story: StoryFn) => (
  <ThemeProvider initialTheme={theme}>
    <div className={`app ${theme}`}>
      <Story />
    </div>
  </ThemeProvider>
);
