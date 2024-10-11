import * as React from "react"
import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from "@chakra-ui/react"

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

const TooltipTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    if (childArray.length === 0) {
      return null;
    }
    const child = childArray[0] as React.ReactElement;
    return React.cloneElement(child, { ref, ...props });
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent }
