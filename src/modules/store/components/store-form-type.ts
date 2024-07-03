import { StoreModel } from 'api-hooks/store/model';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const StoreFormSchema = () =>
  Yup.object({
    platform_id: Yup.string().required(),
    name: Yup.string().required(),
    fee: Yup.number().required(),
    status: Yup.boolean().default(true),
  });

export type StoreFormType = Yup.InferType<
  ReturnType<typeof StoreFormSchema>
> & {
  data?: StoreModel;
};

export type StoreMethodType = ReturnType<typeof useForm<StoreFormType>>;

export const StoreFilterFormSchema = () =>
  Yup.object({
    name: Yup.string().default(''),
    platform_name: Yup.string().default(''),
    fee_start: Yup.mixed(),
    fee_end: Yup.mixed(),
    status: Yup.string().default(''),
    startAt: Yup.date().nullable(),
    endAt: Yup.date().nullable(),
  });

export type StoreFilterFormType = Yup.InferType<
  ReturnType<typeof StoreFilterFormSchema>
>;
