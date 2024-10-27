import React from "react";
import { HashLoader } from "react-spinners";

const Loader: React.FC = () => {
  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      role="status"
      aria-label="Loading content"
    >
      <HashLoader
        size={100}
        color="#2453c3"
        aria-hidden="true"
      />
    </div>
  );
};

export default Loader;
