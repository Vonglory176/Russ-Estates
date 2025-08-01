import { Icon } from "@/utils/icons";
import type { ReactIconProps } from "@/types";

export function ReactIcon({ 
  name, 
  color = '#000000', 
  size = 24, 
  className = '' 
}: ReactIconProps) {
  return (
    <Icon
      name={name}
      color={color}
      size={size}
      className={className}
    />
  );
} 