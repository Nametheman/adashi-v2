import React from "react";

import { ReactComponent as RollingLoader } from "../../assets/icons/rolling.svg";

interface SuspenseWrapperProps {
  path: string;
}

const SuspenseWrapper = (props: SuspenseWrapperProps) => {
  const LazyComponent = React.lazy(() => import(`../../${props.path}`));

  return (
    <React.Suspense
      fallback={
        <div className="loader-container">
          <div className="loader-container-inner">
            <RollingLoader />
          </div>
        </div>
      }
    >
      <LazyComponent />
    </React.Suspense>
  );
};

export default SuspenseWrapper;
