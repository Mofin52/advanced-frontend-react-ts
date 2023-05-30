import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextTheme } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title title title',
  text: 'Some very very long and important text',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Title title title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'Some very very long and important text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Title title title',
  text: 'Some very very long and important text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: 'Title title title',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: 'Some very very long and important text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error = Template.bind({});
Error.args = {
  title: 'Title title title',
  text: 'Some very very long and important text',
  theme: TextTheme.ERROR,
};
Error.decorators = [ThemeDecorator(Theme.DARK)];
