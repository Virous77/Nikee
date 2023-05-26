import React from "react";
import Shimmer from "./Shimmer";

const FlexShimmer = ({ active }: { active?: string }) => {
  return (
    <React.Fragment>
      <div className="shimmer-wrapper">
        <div className="box">
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
      </div>
    </React.Fragment>
  );
};

export default FlexShimmer;
