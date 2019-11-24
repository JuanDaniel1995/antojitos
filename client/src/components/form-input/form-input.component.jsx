import React from "react";

import "./form-input.scss";

const FormInput = ({ handleChange, label, className, ...otherProps }) => (
  <div className="group">
    <input className="form-input" onChange={handleChange} {...otherProps} />
    {label ? (
      <label className={`${className ? "shrink" : ""} form-input-label`}>
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
