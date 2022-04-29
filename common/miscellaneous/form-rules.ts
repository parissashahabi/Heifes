import type { Rule, RuleObject, StoreValue } from "rc-field-form/lib/interface.js";
import { verifyIranianNationalId } from "@persian-tools/persian-tools";

export const isMobileNumber: Rule = {
  validator: (rule: RuleObject, value: StoreValue) => {
    if (value) {
      if (value.length !== 11 || !value.toString().startsWith("09")) {
        return Promise.reject(rule);
      }
    }
    return Promise.resolve();
  },
  message: "فرمت شماره موبایل صحیح نمی باشد",
};

export const isPhoneNumber: Rule = {
  validator: (rule: RuleObject, value: StoreValue) => {
    if (value) {
      if (isNaN(value)) {
        return Promise.reject(rule);
      }
    }
    return Promise.resolve();
  },
  message: "فرمت شماره موبایل صحیح نمی‌باشد",
};

export const isRequired: Rule = {
  validator: (rule: RuleObject, value: StoreValue) => {
    if (value === null || value === undefined || value === "") {
      return Promise.reject(rule);
    }
    return Promise.resolve(true);
  },
  message: "وارد کردن این فیلد اجباری می‌باشد",
};

export const isNationalId = {
  validator: (rule: RuleObject, value: StoreValue) => {
    if (value) {
      if (value.length === 11 || verifyIranianNationalId(value)) {
        return Promise.resolve();
      }
      return Promise.reject(rule);
    }
    return Promise.resolve();
  },
  message: "کد ملی وارد شده صحیح نمی‌باشد",
};

export const isNumber = {
  validator: (rule: RuleObject, value: StoreValue) => {
    if (value) {
      if (isNaN(value)) {
        return Promise.reject(rule);
      }
    }
    return Promise.resolve();
  },
  message: "فرمت عدد وارد شده صحیح نمی‌باشد",
};

export const isPositiveNumber = {
  validator: (rule: RuleObject, value: StoreValue) => {
    if (value) {
      console.log({ value: Number(value) < 0 });
      if (isNaN(value) || Number(value) < 0) {
        return Promise.reject(rule);
      }
    }
    return Promise.resolve();
  },
  message: "مقدار عدد وارد شده باید مثبت باشد",
};
