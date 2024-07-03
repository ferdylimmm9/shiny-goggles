import { Card } from '@mantine/core';
import {
  WholesaleOrderItemModel,
  WholesaleOrderModel,
} from 'api-hooks/wholesale-order/model';
import { string2money } from 'common/utils/string';
import BreadCrumbs from 'components/bread-crumbs';
import { RawDateInput } from 'components/input/date-input-field';
import { RawTextInput } from 'components/input/text-input-field';
import PageLabel from 'components/page-label';
import Table from 'components/table';
import { ColumnType } from 'components/table/type';
import FormContent from 'modules/components/form-content';
import FormScroller from 'modules/components/form-scroller';

import WholesaleDownload from './wholesale-download';
import WholesaleStatusSelect from './wholesale-status-select';

interface WholesaleDetailPreviewProps {
  data: WholesaleOrderModel;
}

export default function WholesaleDetailPreview(
  props: WholesaleDetailPreviewProps,
) {
  const columns: ColumnType<WholesaleOrderItemModel>[] = [
    {
      header: 'Product Name',
      accessorKey: 'productName',
      minWidth: 240,
      footer(column, data) {
        return 'Total';
      },
    },
    {
      header: 'Quantity',
      accessorKey: 'quantity',
      minWidth: 90,
      textAlign: 'right',
      cell: ({ row }) => {
        return string2money(row.quantity);
      },
    },
    {
      header: 'Price',
      accessorKey: 'price',
      minWidth: 90,
      textAlign: 'right',
      cell: ({ row }) => {
        return string2money(row.price);
      },
    },
    {
      header: 'Total Price',
      accessorKey: 'totalPrice',
      minWidth: 90,
      textAlign: 'right',
      cell: ({ row }) => {
        return string2money(row.totalPrice);
      },
      footer(column: number[]) {
        return string2money(column.reduce((prev, item) => prev + item, 0));
      },
    },
  ];

  return (
    <>
      <>
        <BreadCrumbs />
        <PageLabel mb={16} />
      </>
      <FormScroller>
        <FormContent>
          <RawTextInput
            variant="unstyled"
            readOnly
            label="Customer Name"
            maw={180}
            value={props.data.customerName}
          />
          <RawTextInput
            variant="unstyled"
            readOnly
            label="Customer Address"
            value={props.data.customerAddress}
          />
          <RawTextInput
            variant="unstyled"
            readOnly
            maw={180}
            label="Invoice Number"
            value={props.data.invoiceNumber}
          />
          <WholesaleStatusSelect maw={180} data={props.data} label="Status" />
          {props.data.paidAt && (
            <RawDateInput
              value={props.data.paidAt}
              label="Paid At"
              variant="unstyled"
              maw={180}
              readOnly
            />
          )}
          <Card flex={1} my={16} radius={16}>
            <Table
              rowKey={(row) => row.id}
              data={props.data.items}
              columns={columns}
            />
          </Card>
          <WholesaleDownload id={props.data.id} type="button" />
        </FormContent>
      </FormScroller>
    </>
  );
}
