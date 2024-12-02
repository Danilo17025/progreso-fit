import { createClient } from '@libsql/client';
import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import jwt from 'jsonwebtoken'; // Asegúrate de instalar esta librería
import cookieParser from 'cookie-parser'; // Para manejar cookies

// Configuración de rutas y directorios
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../../.env') });

const app = express();
app.use(express.json());
app.use(cookieParser()); // Middleware para procesar cookies

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true, // Permitir el envío de cookies
}));

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

// Ruta para login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [username]
    });

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña almacenada con la ingresada
    if (password !== user.password) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Crear el token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar el token como una cookie segura
    res.cookie('token', token, {
      httpOnly: true, // La cookie no será accesible desde JavaScript
      secure: process.env.NODE_ENV === 'production', // Solo sobre HTTPS en producción
      maxAge: 3600000, // Duración del token (1 hora)
      sameSite: 'Strict', // Protección contra CSRF
    });

    // Enviar respuesta al cliente
    return res.status(200).json({ message: 'Login exitoso' });
  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Obtener el token de las cookies

  if (!token) {
    return res.status(401).json({ error: 'No autorizado, por favor inicie sesión' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token

    // Guardar la información del usuario en el objeto de solicitud
    req.user = decoded;
    next(); // Si el token es válido, pasar al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Ruta protegida (Home)
app.get('/home', verifyToken, (req, res) => {
  res.send('Bienvenido a la página de Home');
  console.log(document.cookie)

});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
