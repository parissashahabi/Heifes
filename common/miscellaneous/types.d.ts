import { ReactElement } from "react";

export type RouteConfig = Record<
  string,
  ("hide" | "ghost" | "protected" | "static-header")[]
>;
export type Children = ReactElement | ReactElement[];
