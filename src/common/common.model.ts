import { Type, Expose } from 'class-transformer';

export class ApiError {
  message: string;
  statusCode?: number;
  errors?: { [key: string]: string };
}

export enum FilterType {
  Text = 'text',
  Number = 'number',
  Option = 'option',
  Date = 'date',
}

export enum FilterBehaviour {
  Exact = 'exact',
  Partial = 'partial',
  Range = 'range',
  Single = 'single',
  Multiple = 'multiple',
  Before = 'before',
  After = 'after',
  LessThan = 'less_than',
  MoreThan = 'more_than',
}

export class Option {
  label: string;
  value: string;
}

export class Filter {
  name: string;
  label: string;
  type: string;

  @Type(() => Option)
  options?: Option[];

  behaviour: FilterBehaviour;
  value?: string | null;
  default?: string;
}
export class Sort {
  options: string[];
  default: string;
  value?: string;
}

export class PaginationMeta {
  to: number;
  total: number;
  from: number;
  path: string;

  @Expose({ name: 'current_page' })
  currentPage: number;

  @Expose({ name: 'last_page' })
  lastPage: number;

  @Expose({ name: 'per_page' })
  perPage: number;
}

export class getEnumsInput {
  class: string;
}

export class EnumResult {
  label: string;
  value: string;
}

export enum PhoneTypeEnum {
  mobile,
  office,
  whatsapp,
}

export class ImageClass {
  @Expose({ name: 'created_at' })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Type(() => Date)
  updatedAt: Date;

  id: string;
  name: string;
  url: string;
}

export class ApiResult<T> {
  data: T;
  message?: string;
}

export class MessageResult {
  message: string;
}

export class ExtendedApiResult<T> extends ApiResult<T> {
  @Type(() => PaginationMeta)
  meta: PaginationMeta;
  @Type(() => Filter)
  filters: Filter[];
  @Type(() => Sort)
  sorts: Sort;
}

export class TimeModel {
  @Expose({ name: 'created_at' })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Type(() => Date)
  updatedAt: Date;
}

export class CommonModel {
  id: string;

  @Expose({ name: 'created_at' })
  @Type(() => Date)
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  @Type(() => Date)
  updatedAt: Date;
}

export interface getParamsInput<
  Params extends { [key: string]: any } = object,
> {
  params: {
    page?: number;
    filter?: { [key: string]: any };
    sort?: string;
    limit?: number;
    q?: string;
  } & Params;
}
