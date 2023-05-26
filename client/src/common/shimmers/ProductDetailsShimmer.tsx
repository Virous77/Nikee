import React from "react";
import "./Shimmer.scss";
import Shimmer from "./Shimmer";

const ProductDetailsShimmer = () => {
  return (
    <React.Fragment>
      <div className="shimmer-wrapper-p">
        <div className="box image-style">
          <div className="small-image">
            <Shimmer
              shimmerCount={[1, 2, 3, 4, 5]}
              stylesClass="shimmer3"
              parent="parent"
            />
          </div>
          <div className="image-shimmer"></div>
        </div>

        <div className="box details">
          <h1></h1>
          <p></p>
          <span></span>

          <b style={{ marginTop: "15px" }} className="b">
            {" "}
          </b>
          <b className="bb"></b>

          <div className="img"></div>
          <b className="bbb"></b>

          <div className="wrap">
            <b></b>
            <b></b>
            <b></b>
            <b></b>
          </div>

          <div className="button" style={{ marginTop: "20px" }}></div>
          <div className="button"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetailsShimmer;
