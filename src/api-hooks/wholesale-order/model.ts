import { Expose, Type } from 'class-transformer';
import { CommonModel, getParamsInput } from 'common/common.model';

export type WholesaleOrderStatusType = 'paid' | 'unpaid';

export class WholesaleOrderLiteModel extends CommonModel {
  @Expose({ name: 'invoice_number' })
  invoiceNumber: string;

  @Expose({ name: 'customer_name' })
  customerName: string;

  @Expose({ name: 'customer_address' })
  customerAddress: string;

  status: WholesaleOrderStatusType;

  @Expose({ name: 'total_price' })
  @Type(() => Number)
  totalPrice: number;

  @Expose({ name: 'paid_at' })
  @Type(() => Date)
  paidAt: Date;
}

export class WholesaleOrderItemModel {
  id: string;

  @Expose({ name: 'product_name' })
  productName: string;

  @Type(() => Number)
  quantity: number;

  @Type(() => Number)
  price: number;

  @Expose({ name: 'total_price' })
  @Type(() => Number)
  totalPrice: number;
}

export class WholesaleStatsModel {
  @Expose({ name: 'paid_order_total' })
  @Type(() => Number)
  paidOrderTotal: number;

  @Expose({ name: 'paid_order_total_count' })
  @Type(() => Number)
  paidOrderTotalCount: number;

  @Expose({ name: 'unpaid_order_total' })
  @Type(() => Number)
  unpaidOrderTotal: number;

  @Expose({ name: 'unpaid_order_total_count' })
  @Type(() => Number)
  unpaidOrderTotalCount: number;
}

export class WholesaleOrderModel extends WholesaleOrderLiteModel {
  @Type(() => WholesaleOrderItemModel)
  items: WholesaleOrderItemModel[];
}

//filter list
export type WholesaleFilterInput = {
  total_price?: string;
  paid_at?: string;
  customer_name?: string;
  customer_address?: string;
  invoice_number?: string;
  status?: string;
};

//sort list
export type WholesaleSortInput =
  | 'total_price'
  | '-total_price'
  | 'paid_at'
  | '-paid_at'
  | 'customer_name'
  | '-customer_name'
  | 'customer_address'
  | '-customer_address'
  | 'invoice_number'
  | '-invoice_number'
  | 'created_at'
  | '-created_at'
  | 'status'
  | '-status';

export type getWholesalesInput = getParamsInput<{
  filter?: WholesaleFilterInput;
  sort?: WholesaleSortInput;
}>;

export type getWholesaleInput = { id: string };

export type WholesaleUpdateStatusType = {
  id: string;
  action: WholesaleOrderStatusType;
};

export type WholesaleDeleteType = {
  id: string;
};
