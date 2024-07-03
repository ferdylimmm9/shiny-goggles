import { useCreateEmployee } from 'api-hooks/employee/mutation';
import { queryClient } from 'common/query-client';
import notification from 'components/notification';
import React from 'react';

import EmployeeForm from './components/employee-form';
import { EmployeeFormType } from './components/employee-form-type';

interface EmployeeCreateProps {
  onClose?: () => void;
}

export default function EmployeeCreate(props: EmployeeCreateProps) {
  const createEmployee = useCreateEmployee();
  const onSubmit = React.useCallback(
    async (values: EmployeeFormType) => {
      const result = await createEmployee.mutateAsync(values);
      queryClient.invalidateQueries();
      notification.success({
        title: 'Add New Staff',
        message: result.message,
      });
      return result;
    },
    [createEmployee],
  );
  return <EmployeeForm onSubmit={onSubmit} onClose={props.onClose} />;
}
