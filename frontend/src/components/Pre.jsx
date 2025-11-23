import React from "react";
import copy from "../img/copy.png";
import copy2x from "../img/copy@2x.png";
import copy3x from "../img/copy@3x.png";

const Pre = ({ children, ...props }) => {
    let language = "";

    if (React.isValidElement(children)) {
        const className = children.props.className || "";
        const matches = className.match(/language-(\w+)/);
        if (matches) {
            language = matches[1];
        }
    }

    return (
        <div className="code-container">
            <div className="code-header">
                <span>{language}</span>
                <button className="Copy-Button">
                    <img
                        src={copy}
                        className="copy"
                        srcSet={`${copy2x}, ${copy3x}`}
                    />{" "}
                    Copy
                </button>
            </div>

            <pre {...props}>{children}</pre>
        </div>
    );
};

export default Pre;
