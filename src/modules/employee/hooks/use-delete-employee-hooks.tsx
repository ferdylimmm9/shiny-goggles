import { Flex, SimpleGrid } from '@mantine/core';
import { modals } from '@mantine/modals';
import { EmployeeLiteModel, EmployeeModel } from 'api-hooks/employee/model';
import { useDeleteEmployee } from 'api-hooks/employee/mutation';
import { InfoIcon } from 'assets/svg';
import { queryClient } from 'common/query-client';
import Button from 'components/button';
import notification from 'components/notification';
import Text from 'components/text';
import React from 'react';
import { color } from 'styles/color';

export default function useDeleteEmployeeHooks() {
  const deleteEmployee = useDeleteEmployee();

  const onDelete = React.useCallback(
    async (id: string) => {
      try {
        const result = await deleteEmployee.mutateAsync({ id });
        notification.success({
          title: 'Delete Staff',
          message: result.message,
        });
        queryClient.invalidateQueries();
      } catch (e) {
        console.error(e);
        e.message &&
          notification.error({
            title: 'Delete Staff',
            message: e.message,
          });
      }
    },
    [deleteEmployee],
  );

  const onClickDelete = React.useCallback(
    (employee: EmployeeLiteModel | EmployeeModel) => {
      const modalId = `delete-modal-${employee.id}`;
      const onClose = () => modals.close(modalId);
      const label = [employee.name, employee.username].join(' - ');
      const labelComponent = (
        <Text span fontWeightVariant="semibold">
          {label}
        </Text>
      );
      modals.open({
        modalId,
        withCloseButton: false,
        children: (
          <>
            <Flex align="center" gap={8} mb={8}>
              <InfoIcon width={24} height={24} color={color.red40} />
              <Text textVariant="body1" fontWeightVariant="semibold">
                Delete Employee
              </Text>
            </Flex>
            <Text mb={28}>
              Are you sure you want to delete the employee {labelComponent} ?
            </Text>
            <SimpleGrid cols={deleteEmployee.isLoading ? 1 : 2}>
              {!deleteEmployee.isLoading && (
                <Button
                  onClick={onClose}
                  buttonVariants={{
                    color: 'quaternary',
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                loading={deleteEmployee.isLoading}
                onClick={async () => {
                  await onDelete(employee.id);
                  onClose();
                }}
                buttonVariants={{
                  color: 'primary',
                }}
              >
                Delete
              </Button>
            </SimpleGrid>
          </>
        ),
      });
    },
    [deleteEmployee.isLoading, onDelete],
  );

  return {
    ...deleteEmployee,
    onDelete,
    onClickDelete,
  };
}
