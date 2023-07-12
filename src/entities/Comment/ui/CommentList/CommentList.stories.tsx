import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentList } from './CommentList';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comments: [{ id: '1', text: 'hello', user: { id: '1', username: 'test' } }, { id: '2', text: 'world', user: { id: '2', username: 'test' } }],
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  comments: [],
};
