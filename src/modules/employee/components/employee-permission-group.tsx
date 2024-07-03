import { Card, Flex, SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useGetPermissions } from 'api-hooks/others/query';
import breakpoints from 'common/breakpoint';
import { useFormState } from 'components/form';
import { RawCheckbox } from 'components/input/checkbox-input-field';
import LoaderView from 'components/loader-view';
import Text from 'components/text';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { color } from 'styles/color';

import { EmployeeFormType } from './employee-form-type';

export default function EmployeePermissionGroup() {
  const query = useGetPermissions();
  const { setValue, control } = useFormContext<EmployeeFormType>();
  const [permissions] = useWatch({
    name: ['permissions'],
    control,
  });

  const isMobile = useMediaQuery(breakpoints.screenMaxLg);

  const { disabled } = useFormState();

  return (
    <LoaderView query={query}>
      {(data) => {
        return (
          <SimpleGrid cols={isMobile ? 1 : 2}>
            {data.map((item) => {
              const itemPermissions = [...item.permissions];

              const isEmpty = permissions.length === 0;

              const checked =
                !isEmpty &&
                itemPermissions.every((permission) => {
                  const hasPermission = permissions.find(
                    (p) => p === permission.id,
                  );
                  return !!hasPermission;
                });

              const indeterminate =
                itemPermissions.some((permission) => {
                  const hasPermission = permissions.find(
                    (p) => p === permission.id,
                  );
                  return !!hasPermission;
                }) &&
                !checked &&
                !isEmpty;

              const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.currentTarget.checked) {
                  const itemPermissionIds = itemPermissions.map((p) => p.id);
                  setValue('permissions', [
                    ...permissions,
                    ...itemPermissionIds,
                  ]);
                } else {
                  const _permissions = permissions.filter((permission) => {
                    const hasPermission = itemPermissions.find(
                      (value) => value.id === permission,
                    );

                    return !hasPermission;
                  });
                  setValue('permissions', _permissions);
                }
              };

              return (
                <Card bg={color.neutral90} key={item.id} radius={12}>
                  <Flex direction="column" gap={12}>
                    <RawCheckbox
                      checked={checked}
                      indeterminate={indeterminate}
                      onChange={onChange}
                      label={
                        <Text
                          textVariant="body3"
                          fontWeightVariant="semibold"
                          c={color.neutral10}
                        >
                          {item.name}
                        </Text>
                      }
                      disabled={disabled}
                    />
                    {item.permissions.map((permission) => {
                      const checked = !!permissions.find(
                        (p) => permission.id === p,
                      );
                      const onChange = (
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        if (e.currentTarget.checked) {
                          setValue('permissions', [
                            ...permissions,
                            permission.id,
                          ]);
                        } else {
                          const _permissions = permissions.filter((p) => {
                            return p !== permission.id;
                          });
                          setValue('permissions', _permissions);
                        }
                      };
                      return (
                        <RawCheckbox
                          checked={checked}
                          key={permission.id}
                          onChange={onChange}
                          disabled={disabled}
                          label={
                            <Text
                              textVariant="body2"
                              fontWeightVariant="regular"
                              c={color.neutral20}
                            >
                              {permission.name}
                            </Text>
                          }
                        />
                      );
                    })}
                  </Flex>
                </Card>
              );
            })}
          </SimpleGrid>
        );
      }}
    </LoaderView>
  );
}
