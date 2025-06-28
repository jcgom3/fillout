// src/components/IconWrapper.tsx
import type { ComponentType, SVGProps } from "react";

interface IconWrapperProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}

export default function IconWrapper({
  icon: Icon,
  className = "",
}: IconWrapperProps) {
  return (
    <Icon className={`w-[20px] h-[20px] ${className}`} aria-hidden="true" />
  );
}
