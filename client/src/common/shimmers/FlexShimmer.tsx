import React from "react";
import Shimmer from "./Shimmer";

const FlexShimmer = ({
  active,
  stylesClass,
}: {
  active?: string;
  stylesClass?: string;
}) => {
  return (
    <React.Fragment>
      <div className={stylesClass ? stylesClass : "box"}>
        {[1, 2, 3, 4].map((item) => (
          <div className="shimmer" key={item}>
            {active === "yes" && (
              <>
                <p>
                  <Shimmer shimmerCount={[1]} stylesClass="shimmer2" />
                </p>
                <span>
                  <Shimmer shimmerCount={[1]} stylesClass="shimmer2" />
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default FlexShimmer;
