import React, { useState } from "react";

import { useAuth } from "../../../hooks/useAuth";

const LoginForm = () => {

    const [email, setEmail] = useState("");

    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        // API REQUEST HERE
        if (email.length) {
            // Replace with actual authentication logic
            await login({ email });
        } else {
            alert("Email invalide");
        }
    };

    return <form onSubmit={handleLogin}>
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse e-mail
            </label>
            <div className="mt-2">
                <input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Entrez votre adresse e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>

        <div className="mt-2">
            <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
                Se connecter
            </button>
        </div>
    </form>;

}

export default LoginForm
