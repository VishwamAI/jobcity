import * as React from "react"
import { Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react"

const Input = React.forwardRef<HTMLInputElement, ChakraInputProps>(
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
export type { ChakraInputProps as InputProps }
