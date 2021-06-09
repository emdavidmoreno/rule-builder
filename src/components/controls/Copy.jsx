import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Copy = ({ value, copied = false, setCopied }) => {
    return (
        // <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
        <CopyToClipboard text={value} onCopy={()=>{}}>
            <FaRegCopy
                className={`absolute text-2xl cursor-pointer right-0 top-0 mr-3 mt-3 z-10 ${
                    copied ? "text-green-400" : "text-blue-400"
                }`}
            />
        </CopyToClipboard>
    );
}

export default Copy;
