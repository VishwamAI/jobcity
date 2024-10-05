import * as React from "react"
import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from "@chakra-ui/react"
import { Slot } from "@radix-ui/react-slot"

const Tooltip = ({ children, ...props }: ChakraTooltipProps) => {
  return (
    <ChakraTooltip {...props}>
      {children}
    </ChakraTooltip>
  )
}

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const TooltipTrigger = React.forwardRef<HTMLButtonElement, { children: React.ReactElement; asChild?: boolean }>(
  ({ children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp ref={ref} {...props}>
        {children}
      </Comp>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = ({ children, ...props }: ChakraTooltipProps) => {
  return <ChakraTooltip {...props}>{children}</ChakraTooltip>
}

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent }
