import { Expose } from 'class-transformer';
import { CommonModel } from 'common/common.model';

export class TokenResultModel {
  @Expose({ name: 'token_type' })
  tokenType: string;

  @Expose({ name: 'expires_in' })
  expiresIn: number;

  @Expose({ name: 'access_token' })
  accessToken: string;

  @Expose({ name: 'refresh_token' })
  refreshToken: string;

  //will create by frontend
  @Expose({ name: 'refresh_token_expired_at' })
  refreshTokenExpiredAt: Date;
}

export class MeModel extends CommonModel {
  name: string;
  username: string;
  email: string;
  status: boolean;
  permissions: string[];
}

export type LoginInput = {
  username: string;
  password: string;
};

export type RefreshInput = {
  refreshToken: string;
};

export type ChangePasswordInput = {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
};

export type UpdateProfileInput = {
  name: string;
  email: string;
  username: string;
};
