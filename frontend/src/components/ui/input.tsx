import * as React from "react"
import { Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react"

export interface InputProps extends ChakraInputProps {
  // Add any additional props here if needed
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <ChakraInput
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
