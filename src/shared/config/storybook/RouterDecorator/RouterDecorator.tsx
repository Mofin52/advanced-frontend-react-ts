// eslint-disable-next-line alexvelix-eslint-plugin/layer-imports
import '@/app/styles/index.scss';
import { StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (Story: StoryFn) => <BrowserRouter><Story /></BrowserRouter>;
