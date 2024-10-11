import * as React from "react"
import { Badge as ChakraBadge, BadgeProps } from "@chakra-ui/react"

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (props, ref) => {
    return (
      <ChakraBadge
        ref={ref}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
export type { BadgeProps }
