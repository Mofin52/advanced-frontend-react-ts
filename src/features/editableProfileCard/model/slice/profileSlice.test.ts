import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { profileActions, profileReducer } from './profileSlice';
import { ProfileSchema, ValidateProfileError } from '../types/editableProfileCardSchema';

const data = {
  username: 'admin',
  age: 22,
  country: Country.Russia,
  lastname: 'asd',
  first: 'asd',
  city: 'Moscow',
  currency: Currency.USD,
};

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true),
    )).toStrictEqual({ readonly: true });
  });

  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { };
    expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit(),
    )).toStrictEqual({ readonly: true, validateErrors: undefined, form: undefined });
  });

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR] };
    expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.pending,
    )).toStrictEqual({ isLoading: true, validateErrors: undefined });
  });

  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = { isLoading: true };
    expect(profileReducer(
            state as ProfileSchema,
            updateProfileData.fulfilled(data, ''),
    )).toStrictEqual({
      isLoading: false, validateErrors: undefined, readonly: true, form: data, data,
    });
  });
});
