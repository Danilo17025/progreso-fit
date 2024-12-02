"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            // Si no hay token, redirige a la página de login
            router.push('/login');
            return;
        }

        // Verificar el token en el servidor
        fetch('http://localhost:5000/home', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log(data.error);
                // Si hay un error con el token, redirige al login
                router.push('/login');
            } else {
                console.log('Acceso permitido a la página de home');
                setIsAuthenticated(true);  // Token es válido, acceso permitido
            }
        })
        .catch(error => {
            console.error('Error de autenticación:', error);
            router.push('/login');
        });
    }, [router]);

    if (!isAuthenticated) {
        return <div>Verificando acceso...</div>;
    }

    return (
        <div>
            <h1>Página de Inicio</h1>
            {/* Aquí puedes agregar contenido exclusivo para usuarios autenticados */}
        </div>
    );
}
