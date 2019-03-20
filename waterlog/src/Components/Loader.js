import React from "react";
import buttonLoaderIcon from "../images/button-spinner.gif"

const Loader = () => {
  return (
    <img
      className="loadingSize"
      src="images/white_on_dark_loading.gif"
      alt="green on dark loader gif"
    />
  );
};
export default Loader;

export function buttonLoader() {
  return (
    <img
      className="loadingSize-on-loadmore"
      src={buttonLoaderIcon}
      alt="button loader"
    />
  );
}
