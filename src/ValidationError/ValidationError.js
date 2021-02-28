import React from "react";
import PropTypes from "prop-types";

import "./ValidationError.css";

export default function ValidationError(props) {
  if (props.message) {
    return (
      <p aria-label="error-message" role="alert" className="error">
        {props.message}
      </p>
    );
  }

  return <></>;
}
ValidationError.propTypes = {
  message: PropTypes.string,
};
