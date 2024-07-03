import { formatDate } from 'date-fns';
import { decamelize, camelize } from 'humps';
import numeral from 'numeral';
import React from 'react';

import { toMoneyPrecision } from './number';

export function string2money(rawValue: string | number): string {
  const value = typeof rawValue === 'number' ? rawValue : parseFloat(rawValue);
  if (isNaN(value)) return '';
  if (Number.isInteger(value)) return numeral(value).format(`0,0`);
  else {
    // numeral cannot parse exponential values so if your calculation should resolve to zero but ends up as a really small number (which is formatted in exponential notation), numeral will end up formatting it as NaN.
    const numberValue = toMoneyPrecision(value);
    return numeral(numberValue).format(`0,0.00`);
  }
}

export function string2number(value: string | number): string {
  return numeral(`${value}`).format('0,0');
}

export function money2number(value: string): number {
  return numeral(value).value() || 0;
}

export function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace);
}

export function capitalize(value: string): string {
  const words = value.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1);
  }
  return words.join(' ');
}

export function isString(node: React.ReactNode): node is string {
  return typeof node === 'string';
}

export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getCurrencySymbol(currency: 'USD' | 'IDR') {
  return currency === 'USD' ? '$' : currency === 'IDR' ? 'Rp ' : '';
}

export function checkCurrencyName({ accessorKey, currencyAccessorKey }) {
  const decamelizeAccessor = decamelize(accessorKey);
  if (Array.isArray(currencyAccessorKey)) {
    let isFound = false;
    for (let i = 0; i < currencyAccessorKey.length; i++) {
      if (decamelizeAccessor.includes(currencyAccessorKey[i])) {
        isFound = true;
        break;
      }
    }
    return isFound;
  }
  return decamelizeAccessor.includes(currencyAccessorKey);
}

export function checkCurrency({ accessorKey, pivot }) {
  let val = '';
  let isFound = false;
  Object.keys(pivot.value).forEach((key) => {
    const childKey = pivot.value[key];
    for (let i = 0; i < childKey.length; i++) {
      if (childKey[i].name === decamelize(accessorKey)) {
        isFound = true;
        val = childKey[i].currency && camelize(childKey[i].currency);
        break;
      }
    }
    if (isFound) return true;
  });
  return val;
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export const multipleNumberGenerator = (data: any) => {
  if (data.type === 'percentage') {
    return `${data.value}%@${data.id}`;
  } else {
    return `${data.value}@${data.id}`;
  }
};

export function generateLabelNumber(text: string) {
  const value = text.split('@')[0];
  const nominal = parseFloat(value);
  return Number.isNaN(parseFloat(value)) ? string2number(nominal) : value;
}

export function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

export const isWindowUndefined = typeof window === 'undefined';

export function generateStringToDate(
  created_at: string | null | undefined = '',
) {
  try {
    const [startAt, endAt] = (created_at || '')
      .split(',')
      .filter(Boolean)
      .map((date) => new Date(date));

    return [startAt, endAt];
  } catch (e) {
    console.error(e);
    return [undefined, undefined];
  }
}

export function generateDatesToString(
  startAt: Date | null | undefined = null,
  endAt: Date | null | undefined = null,
) {
  try {
    const result = [startAt, endAt]
      .filter(Boolean)
      .map((date: Date) => {
        return formatDate(date, 'yyyy-MM-dd');
      })
      .join(',');
    return result || undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export function generateStringToNumbers(value: string | null | undefined = '') {
  try {
    const [start, end] = (value || '')
      .split(',')
      .filter((val) => {
        const notANumber = isNaN(parseFloat(val));
        if (notANumber) return false;
        return val;
      })
      .map((date) => parseFloat(date));
    return [start, end];
  } catch (e) {
    console.error(e);
    return [undefined, undefined];
  }
}

export function generateNumbersToString(
  start: string | number | null = null,
  end: string | number | null = null,
) {
  const result = [start, end]
    .filter((val) => {
      if (val === null) return false;
      if (typeof val === 'number') return true;
      if (typeof val === 'string') return !!val;
      return !!val;
    })
    .join(',');
  return result || undefined;
}

export function trimFilter<T extends object>(values: T) {
  const filter = {};

  Object.keys(values).map((key) => {
    if (values[key]) {
      filter[key] = values[key];
    }
  });

  return Object.keys(filter).length ? filter : undefined;
}
