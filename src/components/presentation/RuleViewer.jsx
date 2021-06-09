import React from 'react';
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/jsx/jsx";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/lucario.css";
import { useRuleFormat } from '../../context/RuleFormatContext';
import { FormatSelector, Copy } from '../controls';


const options = {
    mode: "jsx",
    theme: "lucario",
    lineNumbers: true,
    lineWrapping: true,
}; 

const RuleViewer = ({
  value = null,
}) => {
  const {format, setFormat,  rulesString} = useRuleFormat();
  const handleChangeFormat = (value => setFormat(value));
  return (
    <div className="flex flex-col flex-wrap relative mt-5 w-full h-full">
      <div className="flex w-1/2 z-10 relative mb-8">
        <FormatSelector
          id={'format-selector'}
          name={'format'}
          selectedValue={format}
          handleChange={handleChangeFormat}
        />
      </div>
      <div className="relative">
        <Copy />  
        <CodeMirror
            value={rulesString}
            options={options}
            autoCursor={false}
        />
      </div>
    </div>
  );
};

export default RuleViewer;