import React from 'react';
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/jsx/jsx";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/lucario.css";
import { useRuleFormat } from '../../context/RuleFormatContext';


const options = {
    mode: "jsx",
    theme: "lucario",
    lineNumbers: true,
    lineWrapping: true,
}; 

const RuleViewer = ({
  value = null,
}) => {
  const {format, setFormat,  rulesString} = useRuleFormat()
  return (
    <div className="flex flex-col flex-wrap relative mt-5 w-full h-full">
      <CodeMirror
          value={rulesString}
          options={options}
          autoCursor={false}
      />
    </div>
  );
};

export default RuleViewer;