import { Expose } from 'class-transformer';

export class PermissionGroupModel {
  category: string;

  @Expose({ name: 'permission_groups' })
  permissionGroups: { id: string; name: string }[];
}

export class PermissionModel {
  id: string;
  name: string;

  permissions: { id: string; name: string }[];
}
