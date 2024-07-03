import { PlatformTypeEnum } from 'api-hooks/platform/model';
import { Expose, Type } from 'class-transformer';
import { getParamsInput } from 'common/common.model';

export class TotalModel {
  quantity: number;
  sales: number;

  @Expose({ name: 'gross_profit' })
  grossProfit: number;

  @Expose({ name: 'net_profit' })
  netProfit: number;
}

export class ProductReportModel {
  @Expose({ name: 'gross_profit' })
  @Type(() => Number)
  grossProfit: number;

  @Expose({ name: 'net_margin' })
  @Type(() => Number)
  netMargin: number;

  @Expose({ name: 'net_profit' })
  @Type(() => Number)
  netProfit: number;

  @Expose({ name: 'product_id' })
  productId: string;

  @Expose({ name: 'product_name' })
  productName: string;

  @Type(() => Number)
  quantity: number;

  @Type(() => Number)
  sales: number;

  @Expose({ name: 'unit_price' })
  @Type(() => Number)
  unitPrice: number;
}
export class SalesReportModel {
  @Expose({ name: 'gross_profit' })
  @Type(() => Number)
  grossProfit: number;

  @Expose({ name: 'net_margin' })
  @Type(() => Number)
  netMargin: number;

  @Expose({ name: 'net_profit' })
  @Type(() => Number)
  netProfit: number;

  platform: PlatformTypeEnum;

  @Expose({ name: 'product_id' })
  productId: string;

  @Expose({ name: 'product_name' })
  productName: string;

  @Type(() => Number)
  quantity: number;

  @Type(() => Number)
  sales: number;

  @Expose({ name: 'unit_price' })
  @Type(() => Number)
  unitPrice: number;
}

export type ProductReportFilterInput = {
  product_name?: string;
  quantity?: string;
  unit_price?: string;
  sales?: string;
  gross_profit?: string;
  net_profit?: string;
  net_margin?: string;
};

export type ProductSortInput =
  | 'product_name'
  | '-product_name'
  | 'quantity'
  | '-quantity'
  | 'unit_price'
  | '-unit_price'
  | 'sales'
  | '-sales'
  | 'gross_profit'
  | '-gross_profit'
  | 'net_profit'
  | '-net_profit'
  | 'net_margin'
  | '-net_margin';

export type getProductReportInput = getParamsInput<{
  filter?: ProductReportFilterInput;
  sort?: ProductSortInput;
  date?: string | null;
}>;

export type SalesReportFilterInput = {
  product_name?: string;
  quantity?: string;
  unit_price?: string;
  sales?: string;
  gross_profit?: string;
  net_profit?: string;
  net_margin?: string;
};

export type SalesSortInput =
  | 'product_name'
  | '-product_name'
  | 'quantity'
  | '-quantity'
  | 'unit_price'
  | '-unit_price'
  | 'sales'
  | '-sales'
  | 'gross_profit'
  | '-gross_profit'
  | 'net_profit'
  | '-net_profit'
  | 'net_margin'
  | '-net_margin';

export type getSalesReportInput = getParamsInput<{
  filter?: SalesReportFilterInput;
  sort?: SalesSortInput;
  date?: string | null;
}> & {
  storeId?: string;
};
