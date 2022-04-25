import withSizes, { Sizes } from "react-sizes";
import React from "react";

export function sizes<P extends Object>(component: React.ComponentType<P>) {
  type K = Omit<P, "xs" | "sm" | "md" | "lg" | "xl">;
  const size = withSizes<K | SizeProps, K & SizePropsOptional>(_sizes)
  return size(component as React.ComponentType<K & SizePropsOptional>);
}

function _sizes<P>({ width }: Sizes) {
  return ({
    xs: width <= 578,
    sm: width <= 768,
    md: width <= 1024,
    lg: width <= 1200,
    xl: width <= 1600,
  }) as SizeProps;
}

export interface SizeProps {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

interface SizePropsOptional {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}
