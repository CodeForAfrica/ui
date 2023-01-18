import React from "react";

const Mooc = React.forwardRef(function Mooc(props, ref) {
  return (
    <div ref={ref}>
      <h1>Mooc</h1>
    </div>
  );
});

export default Mooc;
