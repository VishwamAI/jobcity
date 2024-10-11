import * as React from "react"
import { Avatar as ChakraAvatar, AvatarProps as ChakraAvatarProps } from "@chakra-ui/react"

export interface AvatarProps extends ChakraAvatarProps {
  src?: string
  fallback?: string
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, fallback, ...props }, ref) => {
    return (
      <ChakraAvatar
        ref={ref}
        src={src}
        name={fallback}
        {...props}
      />
    )
  }
)
Avatar.displayName = "Avatar"

const AvatarImage = ChakraAvatar
const AvatarFallback = ChakraAvatar

export { Avatar, AvatarImage, AvatarFallback }
