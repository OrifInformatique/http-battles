import React from "react";

export default function Random({ className, label}) {
    return(<>
        <button type="button" className={className}>
            {label}
        </button>
    </>);
}