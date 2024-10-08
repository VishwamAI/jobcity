import * as React from "react";
import {
  Progress as ChakraProgress,
  ProgressProps as ChakraProgressProps,
} from "@chakra-ui/react";

export interface ProgressProps extends ChakraProgressProps {
  // Add any additional props here if needed
  color?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (props, ref) => {
    return <ChakraProgress ref={ref} {...props} />;
  }
);

Progress.displayName = "Progress";

export { Progress };
