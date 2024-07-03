import { ProductModel } from 'api-hooks/product/model';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const ProductFormSchema = () =>
  Yup.object({
    vendor_name: Yup.string().required(),
    tokopedia_name: Yup.string().required(),
    shopee_name: Yup.string().required(),
    total_buy_price: Yup.number().required(),
    stock: Yup.number().required(),
  });

export type ProductFormType = Yup.InferType<
  ReturnType<typeof ProductFormSchema>
> & {
  data?: ProductModel;
};

export type ProductMethodType = ReturnType<typeof useForm<ProductFormType>>;

export const ProductFilterFormSchema = () =>
  Yup.object({
    vendor_name: Yup.string().default(''),
    tokopedia_name: Yup.string().default(''),
    shopee_name: Yup.string().default(''),
    total_buy_price_start: Yup.mixed(),
    total_buy_price_end: Yup.mixed(),
    stock_start: Yup.mixed(),
    stock_end: Yup.mixed(),
    startAt: Yup.date().nullable(),
    endAt: Yup.date().nullable(),
  });

export type ProductFilterFormType = Yup.InferType<
  ReturnType<typeof ProductFilterFormSchema>
>;

export const ProductImportSalesFormSchema = () =>
  Yup.object({
    orderFile: Yup.array(
      Yup.object({
        name: Yup.string().required(),
      }),
    ).default([]),
    incomeFile: Yup.array(
      Yup.object({
        name: Yup.string().required(),
      }),
    ).default([]),
    storeId: Yup.string().default('').required(),
  });

export type ProductImportSalesFormType = Yup.InferType<
  ReturnType<typeof ProductImportSalesFormSchema>
>;

export const ProductImportFormSchema = () =>
  Yup.object({
    file: Yup.array(
      Yup.object({
        name: Yup.string().required(),
      }),
    ).default([]),
  });

export type ProductImportFormType = Yup.InferType<
  ReturnType<typeof ProductImportFormSchema>
>;
