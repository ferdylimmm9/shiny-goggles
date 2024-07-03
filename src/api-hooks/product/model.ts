import { Expose, Type } from 'class-transformer';
import { CommonModel, getParamsInput } from 'common/common.model';

export class ProductLiteModel extends CommonModel {
  @Expose({ name: 'tokopedia_name' })
  tokopediaName: string;

  @Expose({ name: 'shopee_name' })
  shopeeName: string;

  @Expose({ name: 'vendor_name' })
  vendorName: string;

  stock: number;

  @Expose({ name: 'total_buy_price' })
  @Type(() => Number)
  totalBuyPrice: number;

  @Expose({ name: 'current_stock' })
  @Type(() => Number)
  currentStock: number;

  status: boolean;
}

export class ProductModel extends CommonModel {
  @Expose({ name: 'tokopedia_name' })
  tokopediaName: string;

  @Expose({ name: 'shopee_name' })
  shopeeName: string;

  @Expose({ name: 'vendor_name' })
  vendorName: string;

  stock: number;

  @Expose({ name: 'total_buy_price' })
  @Type(() => Number)
  totalBuyPrice: number;

  status: boolean;
}

// query

//filter list
export type ProductFilterInput = {
  shopee_name?: string;
  tokopedia_name?: string;
  vendor_name?: string;
  stock?: string;
  total_buy_price?: string;
  created_at?: string;
};

//sort list
export type ProductSortInput =
  | 'tokopedia_name'
  | '-tokopedia_name'
  | 'shopee_name'
  | '-shopee_name'
  | 'vendor_name'
  | '-vendor_name'
  | 'stock'
  | '-stock'
  | 'current_stock'
  | '-current_stock'
  | 'created_at'
  | '-created_at'
  | 'total_buy_price'
  | '-total_buy_price';

export type getProductsInput = getParamsInput<{
  filter?: ProductFilterInput;
  sort?: ProductSortInput;
}>;

export type getProductInput = { id: string };

// mutation
export type ProductInputType = {
  tokopedia_name: string;
  shopee_name: string;
  vendor_name: string;
  stock: number;
  // totalBuyPrice: number;
  total_buy_price: number;
};

export type ProductUpdateType = {
  id: string;
  data: ProductInputType;
};

export type ProductDeleteType = {
  id: string;
};

export type ImportSalesType = {
  id: string;
  data: any;
};

export type ImportProductType = {
  data: any;
};
