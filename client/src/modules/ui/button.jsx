import React from 'react'
import './ui.css'

export default function Button({form, className, label}) {
    return(<>
        <button form={form} type="submit" className={className}>
            {label}
        </button>
    </>);
}