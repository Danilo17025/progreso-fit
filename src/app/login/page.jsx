'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password,
            }, {
                withCredentials: true,
            });

            if (response.status === 200) {
                console.log(response.data.message);
                router.push('/home');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || 'Error al iniciar sesión');
            } else {
                setError('Error de conexión. Por favor, intente más tarde.');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-black text-center mb-6">Iniciar Sesión</h1>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="block text-gray-700 font-medium">
                            Usuario o Email
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Usuario o Email"
                            className="w-full px-4 py-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && <div className="text-red-600 text-sm">{error}</div>}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="mr-2"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember" className="text-gray-700">
                                Recordar contraseña
                            </label>
                        </div>

                        <a
                            href="/register"
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Registrarme
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
}

