import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      role="progressbar"
      aria-label="Loading..."
      aria-busy="true"
    >
      <HashLoader size={100} color="#2453c3" />
    </div>
  );
};

export default Loader;
