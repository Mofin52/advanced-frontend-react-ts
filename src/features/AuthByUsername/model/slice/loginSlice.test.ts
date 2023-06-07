import { DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginReducer, loginActions } from './loginSlice';

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<LoginSchema> = { username: '123' };
    expect(loginReducer(
        state as LoginSchema,
        loginActions.setUserName('456'),
    )).toStrictEqual({ username: '456' });
  });

  test('test set password', () => {
    const state: DeepPartial<LoginSchema> = { password: '123' };
    expect(loginReducer(
          state as LoginSchema,
          loginActions.setPassword('456'),
    )).toStrictEqual({ password: '456' });
  });
});
