import React from "react";

import "./custom-button.scss";

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button className="button" {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
