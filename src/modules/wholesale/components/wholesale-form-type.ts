import * as Yup from 'yup';

export const WholesaleFilterFormSchema = () =>
  Yup.object({
    total_price_start: Yup.mixed(),
    total_price_end: Yup.mixed(),
    paid_at_start: Yup.date().nullable(),
    paid_at_end: Yup.date().nullable(),
    customer_name: Yup.string().default(''),
    customer_address: Yup.string().default(''),
    invoice_number: Yup.string().default(''),
    status: Yup.string().default(''),
  });

export type WholesaleFilterFormType = Yup.InferType<
  ReturnType<typeof WholesaleFilterFormSchema>
>;

export const WholesaleImportFormSchema = () =>
  Yup.object({
    customer_name: Yup.string().required(),
    customer_address: Yup.string().default(''),
    files: Yup.array(Yup.mixed()).default([]),
  });

export type WholesaleImportFormType = Yup.InferType<
  ReturnType<typeof WholesaleImportFormSchema>
>;
