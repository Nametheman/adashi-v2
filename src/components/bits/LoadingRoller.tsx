import React from "react";

import { ReactComponent as RollingLoader } from "../../assets/icons/rolling.svg";

const LoadingRoller = () => {
  return (
    <div className="loader-container">
      <div className="loader-container-inner">
        <RollingLoader />
      </div>
    </div>
  );
};

export default LoadingRoller;
