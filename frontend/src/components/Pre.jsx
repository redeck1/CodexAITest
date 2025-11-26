import React, { useState, useRef } from "react";
import copy from "../img/copy.png";
import copy2x from "../img/copy@2x.png";
import copy3x from "../img/copy@3x.png";

const Pre = ({ children, ...props }) => {
    let language = "";
    const [copied, setCopied] = useState(false);
    const preRef = useRef(null);

    if (React.isValidElement(children)) {
        const className = children.props.className || "";
        const matches = className.match(/language-(\w+)/);
        if (matches) {
            language = matches[1];
        }
    }

    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            return false;
        }
    }

    const handleCopy = async () => {
        if (preRef.current) {
            const codeText = preRef.current.innerText;
            const success = await copyToClipboard(codeText);
            if (success) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    };

    return (
        <div className="code-container">
            <div className="code-header">
                <span>{language}</span>
                <button className="Copy-Button" onClick={handleCopy}>
                    <img
                        src={copy}
                        className="copy"
                        srcSet={`${copy2x}, ${copy3x}`}
                        alt="copy icon"
                    />
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>

            <pre ref={preRef} {...props}>
                {children}
            </pre>
        </div>
    );
};

export default Pre;
