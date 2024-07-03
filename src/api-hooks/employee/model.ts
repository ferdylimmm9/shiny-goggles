import { Expose } from 'class-transformer';
import { CommonModel, getParamsInput } from 'common/common.model';

export class EmployeeLiteModel extends CommonModel {
  name: string;
  username: string;
  email: string;

  @Expose({ name: 'permission_count' })
  permissionCount: number;

  status: boolean;
}

export class EmployeeModel extends CommonModel {
  name: string;
  username: string;
  email: string;
  status: boolean;
  permissions: string[];
}

// query

//filter list
export type EmployeeFilterInput = {
  name?: string;
  username?: string;
  email?: string;
  created_at?: string;
  status?: 'Active' | 'Inactive';
};

//sort list
export type EmployeeSortInput =
  | 'name'
  | '-name'
  | 'username'
  | '-username'
  | 'email'
  | '-email'
  | 'created_at'
  | '-created_at'
  | 'status'
  | '-status';

export type getEmployeesInput = getParamsInput<{
  filter?: EmployeeFilterInput;
  sort?: EmployeeSortInput;
}>;

export type getEmployeeInput = { id: string };

// mutation
export type EmployeeInputType = {
  name: string;
  username: string;
  email: string;
  password?: string;
  status: boolean;
  permissions: string[];
};

export type EmployeeUpdateType = {
  id: string;
  data: EmployeeInputType;
};

export type EmployeeDeleteType = {
  id: string;
};
