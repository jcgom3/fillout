import { ComponentType, SVGProps } from "react";

export type Page = {
  id: string;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};
