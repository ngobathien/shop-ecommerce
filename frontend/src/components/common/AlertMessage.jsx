import Alert from "react-bootstrap/Alert";

import React from "react";

function AlertMessage({ message }) {
  return (
    <>
      {[
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          {message}
        </Alert>
      ))}
    </>
  );
}

export default AlertMessage;
