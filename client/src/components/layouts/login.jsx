import React from 'react'
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
    return (<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                alt="Orif"
                src="/assets/images/logo.jpg"
                className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                HTTP Battles - Initiation au protocol HTTP
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Outlet />
        </div>
    </div>);
}

export default LoginLayout
