import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { ApiError, ApiResult } from 'common/common.model';
import { API_LIST, callApi } from 'common/utils/client';

import {
  ChangePasswordInput,
  LoginInput,
  RefreshInput,
  TokenResultModel,
  UpdateProfileInput,
} from './model';

export function useLogin(
  options?: UseMutationOptions<
    ApiResult<TokenResultModel>,
    ApiError,
    LoginInput
  >,
): UseMutationResult<ApiResult<TokenResultModel>, ApiError, LoginInput> {
  return useMutation<ApiResult<TokenResultModel>, ApiError, LoginInput>(
    async function (data) {
      return await callApi(
        {
          url: `${API_LIST.Auth}/login`,
          data,
          method: 'POST',
        },
        TokenResultModel,
      );
    },
    options,
  );
}

export function useRefreshTokenInput(
  options?: UseMutationOptions<
    ApiResult<TokenResultModel>,
    ApiError,
    RefreshInput
  >,
): UseMutationResult<ApiResult<TokenResultModel>, ApiError, RefreshInput> {
  return useMutation<ApiResult<TokenResultModel>, ApiError, RefreshInput>(
    async function (data) {
      return await callApi(
        {
          url: `${API_LIST.Auth}/refresh`,
          data,
          method: 'POST',
        },
        TokenResultModel,
      );
    },
    options,
  );
}

export function useRevoke(
  options?: UseMutationOptions<{ message: string }, ApiError>,
): UseMutationResult<{ message: string }, ApiError> {
  return useMutation<{ message: string }, ApiError>(async function () {
    return await callApi({
      url: `${API_LIST.Auth}/revoke`,
      method: 'POST',
    });
  }, options);
}

export function useChangePassword(
  options?: UseMutationOptions<
    { message: string },
    ApiError,
    ChangePasswordInput
  >,
): UseMutationResult<{ message: string }, ApiError, ChangePasswordInput> {
  return useMutation<{ message: string }, ApiError, ChangePasswordInput>(
    async function (data) {
      return await callApi({
        url: `${API_LIST.MeAuth}/change-password`,
        data,
        method: 'POST',
      });
    },
    options,
  );
}

export function useProfileUpdate(
  options?: UseMutationOptions<
    { message: string },
    ApiError,
    UpdateProfileInput
  >,
): UseMutationResult<{ message: string }, ApiError, UpdateProfileInput> {
  return useMutation<{ message: string }, ApiError, UpdateProfileInput>(
    async function (data) {
      return await callApi({
        url: `${API_LIST.MeAuth}/update-profile`,
        data,
        method: 'PATCH',
      });
    },
    options,
  );
}
