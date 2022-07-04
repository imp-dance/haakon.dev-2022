import { ReactNode } from "react";

export type FontKind =
  | "h1"
  | "h2"
  | "h3"
  | "subtitle"
  | "body"
  | "small"
  | "label"
  | "code"
  | "button";

export type ButtonKind =
  | "regular"
  | "primary"
  | "success"
  | "danger"
  | "ghost";

export type ButtonSize = "sm" | "md" | "lg" | "field";

export type ToastKind = "success" | "error" | "info";

export type BaseToast = {
  text: string;
  kind?: ToastKind;
  /** Duration, in milliseconds. Default 1500 */
  duration?: number;
  icon?: ReactNode;
};

export type ActionToast = BaseToast & {
  action: () => void;
  actionText: string;
};

export type Toast = BaseToast | ActionToast | string;

export type ColorToken =
  | "focus-01"
  | "ui-01"
  | "ui-02"
  | "ui-03"
  | "ui-04"
  | "ui-05"
  | "ui-bg"
  | "text-01"
  | "text-02"
  | "text-03"
  | "text-04"
  | "text-05"
  | "primary-01"
  | "primary-02"
  | "primary-03"
  | "success-01"
  | "success-02"
  | "success-03"
  | "danger-01"
  | "danger-02"
  | "danger-03";
