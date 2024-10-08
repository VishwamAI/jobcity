import * as React from "react";
import {
  Badge as ChakraBadge,
  BadgeProps as ChakraBadgeProps,
} from "@chakra-ui/react";

export interface BadgeProps extends ChakraBadgeProps {
  // Add any additional props here if needed
  color?: string;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  return <ChakraBadge ref={ref} {...props} />;
});

Badge.displayName = "Badge";

export { Badge };
