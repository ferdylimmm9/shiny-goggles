import { useUpdateEmployee } from 'api-hooks/employee/mutation';
import { useGetEmployee } from 'api-hooks/employee/query';
import { queryClient } from 'common/query-client';
import LoaderView from 'components/loader-view';
import notification from 'components/notification';
import { useRouter } from 'next/router';
import React from 'react';

import EmployeeForm from './components/employee-form';
import { EmployeeFormType } from './components/employee-form-type';

interface EmployeeViewProps {
  id?: string;
  onClose?: () => void;
}

export default function EmployeeView(props: EmployeeViewProps) {
  const { query } = useRouter();
  const id = props?.id ?? (query.id as string);
  const getEmployee = useGetEmployee({ input: { id } });

  const updateEmployee = useUpdateEmployee();
  const onSubmit = React.useCallback(
    async ({ password, ...rest }: EmployeeFormType) => {
      const result = await updateEmployee.mutateAsync({
        id,
        data: rest,
      });
      queryClient.invalidateQueries();
      notification.success({
        title: 'Update Staff',
        message: result.message,
      });
      return result;
    },
    [id, updateEmployee],
  );
  return (
    <LoaderView query={getEmployee}>
      {(data) => {
        return (
          <EmployeeForm
            employee={data.data}
            onSubmit={onSubmit}
            onClose={props.onClose}
          />
        );
      }}
    </LoaderView>
  );
}
