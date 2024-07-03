import * as Yup from 'yup';

export const ReportFilterFormSchema = () =>
  Yup.object({
    product_name: Yup.string().default(''),
    date_start: Yup.date(),
    date_end: Yup.date(),
    quantity_start: Yup.mixed(),
    quantity_end: Yup.mixed(),
    unit_price_start: Yup.mixed(),
    unit_price_end: Yup.mixed(),
    sales_start: Yup.mixed(),
    sales_end: Yup.mixed(),
    gross_profit_start: Yup.mixed(),
    gross_profit_end: Yup.mixed(),
    net_profit_start: Yup.mixed(),
    net_profit_end: Yup.mixed(),
    net_margin_start: Yup.mixed(),
    net_margin_end: Yup.mixed(),
  });

export type ReportFilterFormType = Yup.InferType<
  ReturnType<typeof ReportFilterFormSchema>
>;
