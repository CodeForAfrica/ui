import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-textmate";

function CodeEditor({
  code,
  setCode,
  readOnly,
}: {
  code: string;
  setCode: any;
  readOnly: boolean;
}) {
  return (
    <AceEditor
      mode="python"
      theme="textmate"
      onChange={(newCode) => setCode(newCode)}
      name="code-editor"
      editorProps={{ $blockScrolling: true }}
      showGutter={false}
      showPrintMargin={false}
      readOnly={readOnly}
      value={code}
      style={{
        width: "100%",
        height: "500px",
        border: "1px solid #C4C4C4",
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    />
  );
}

export default CodeEditor;
