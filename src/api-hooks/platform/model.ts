import { Expose, Type } from 'class-transformer';
import { CommonModel, getParamsInput } from 'common/common.model';

export enum PlatformTypeEnum {
  Shopee = 'Shopee',
  Tokopedia = 'Tokopedia',
  Tiktok = 'Tiktok',
}

export class PlatformLiteModel extends CommonModel {
  name: PlatformTypeEnum;

  @Expose({ name: 'deleted_at' })
  @Type(() => Date)
  deletedAt: Date | null;
}

//filter list
export type PlatformFilterInput = undefined;

//sort list
export type PlatformSortInput = undefined;

export type getPlatformsInput = getParamsInput<{
  filter?: PlatformFilterInput;
  sort?: PlatformSortInput;
}>;
