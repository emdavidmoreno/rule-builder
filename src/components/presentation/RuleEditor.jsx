import React, { useState } from 'react';
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/jsx/jsx";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/lucario.css";


const options = {
    mode: "jsx",
    theme: "lucario",
    lineNumbers: true,
    lineWrapping: true,
}; 

const RuleEditor = ({
  value = null,
  handleChange = ()=> {}
}) => {
  return (
    <div className="flex flex-col flex-wrap relative mt-5 w-full h-full">
    <CodeMirror
        value={value}
        options={options}
        autoCursor={false}
        onChange={(editor, data, value) => {
          handleChange(value);
        }}
    />
</div>
  );
};

export default RuleEditor;