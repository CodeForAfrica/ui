import React from "react";

const DocumentList = React.forwardRef(function DocumentList(ref) {
  return (
    <div ref={ref}>
      <h1>Document List</h1>
    </div>
  );
});

export default DocumentList;
