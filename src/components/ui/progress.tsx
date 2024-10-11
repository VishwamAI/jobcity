import * as React from "react"
import { Progress as ChakraProgress, ProgressProps } from "@chakra-ui/react"

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (props, ref) => {
    return (
      <ChakraProgress
        ref={ref}
        {...props}
      />
    )
  }
)

Progress.displayName = "Progress"

export { Progress }
export type { ProgressProps }
