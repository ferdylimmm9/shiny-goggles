import { PlatformLiteModel } from 'api-hooks/platform/model';
import { Expose, Type } from 'class-transformer';
import { CommonModel, getParamsInput } from 'common/common.model';

export class StoreLiteModel extends CommonModel {
  @Type(() => PlatformLiteModel)
  platform: PlatformLiteModel;

  name: string;

  @Type(() => Number)
  fee: number;

  status: boolean;

  @Expose({ name: 'deleted_at' })
  @Type(() => Date)
  deletedAt: Date | null;
}

export class StoreModel extends StoreLiteModel {}

//filter list
export type StoreFilterInput = {
  name?: string;
  platform_name?: string;
  fee?: string;
  created_at?: string;
  status?: 'Active' | 'Inactive';
};

//sort list
export type StoreSortInput =
  | 'name'
  | '-name'
  | 'platform_name'
  | '-platform_name'
  | 'fee'
  | '-fee'
  | 'created_at'
  | '-created_at'
  | 'status'
  | '-status';

export type getStoresInput = getParamsInput<{
  filter?: StoreFilterInput;
  sort?: StoreSortInput;
}>;

export type getStoreInput = { id: string };

// mutation
export type StoreInputType = {
  platform_id: string;
  name: string;
  fee: number;
  status: boolean;
};

export type StoreUpdateType = {
  id: string;
  data: StoreInputType;
};

export type StoreDeleteType = {
  id: string;
};
