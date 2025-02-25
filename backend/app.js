const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const https = require('https');
const fs = require('fs');
const PORT = 5000;

// Configuración de conexión a la base de datos
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'invitacionmaia',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.on('error', (err) => {
    console.error('Error en la base de datos:', err);
});

const corsOptions = {
  origin: 'https://teinvito.im', // Cambia esto según el puerto donde corre tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Middleware para habilitar CORS
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para recibir y guardar reservas
app.post('/api/reservas', (req, res) => {
    const reservas = req.body;

    if (!Array.isArray(reservas) || reservas.length === 0) {
        return res.status(400).json({ message: 'El formato de las reservas es incorrecto o está vacío.' });
    }

    const query = 'INSERT INTO reservas (nombre, apellido, restriccion) VALUES ?';
    const values = reservas.map(reserva => [reserva.nombre, reserva.apellido, reserva.restriccion || null]);

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error('Error al guardar las reservas:', err);
            return res.status(500).json({ message: 'Error al guardar las reservas.', error: err });
        }

        res.status(201).json({ message: 'Reservas guardadas correctamente.', totalReservas: reservas.length });
    });
});

// Endpoint para guardar canciones
app.post('/api/canciones', (req, res) => {
    const { cancion } = req.body;

    if (!cancion || typeof cancion !== 'string') {
        return res.status(400).json({ message: 'Se intentó agregar una canción vacía.' });
    }

    const query = 'INSERT INTO canciones (cancion) VALUES (?)';

    db.query(query, [cancion], (err, result) => {
        if (err) {
            console.error('Error al guardar la canción:', err);
            return res.status(500).json({ message: 'Error al guardar la canción.', error: err });
        }

        res.status(201).json({ message: 'Canción guardada correctamente.' });
    });
});

// Endpoint para obtener la lista de reservas con paginación
app.get('/api/reservas', (req, res) => {
    const { page = 1, limit = 20 } = req.query; // Parámetros de paginación con valores por defecto

    const offset = (page - 1) * limit; // Calcular el offset para la consulta

    const query = 'SELECT * FROM reservas LIMIT ? OFFSET ?';
    const totalQuery = 'SELECT COUNT(*) as total FROM reservas'; // Para obtener el total de registros

    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener la conexión:', err);
            return res.status(500).json({
                message: 'Error al conectar con la base de datos.',
                error: err
            });
        }

        // Ejecutar ambas consultas en paralelo
        connection.query(totalQuery, (totalErr, totalResult) => {
            if (totalErr) {
                connection.release();
                console.error('Error al obtener el total de reservas:', totalErr);
                return res.status(500).json({
                    message: 'Error al obtener el total de reservas.',
                    error: totalErr
                });
            }

            const total = totalResult[0].total;

            connection.query(query, [parseInt(limit), parseInt(offset)], (err, results) => {
                connection.release();

                if (err) {
                    console.error('Error al obtener las reservas:', err);
                    return res.status(500).json({
                        message: 'Error al obtener las reservas.',
                        error: err
                    });
                }

                res.status(200).json({
                    message: 'Reservas obtenidas correctamente.',
                    reservas: results,
                    total,
                    page: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                });
            });
        });
    });
});

// Endpoint para obtener canciones
app.get('/api/canciones', (req, res) => {
    const query = 'SELECT * FROM canciones';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las canciones:', err);
            return res.status(500).json({ message: 'Error al obtener las canciones.', error: err });
        }

        res.status(200).json({ message: 'Canciones obtenidas correctamente.', canciones: results });
    });
});

// Configuración HTTPS

// Configuración del SSL
const options = {
  key: fs.readFileSync('./localhost.key'),  // Ruta a la clave privada
  cert: fs.readFileSync('./localhost.crt')  // Ruta al certificado
};
// Iniciar el servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
    console.log(`Servidor HTTPS ejecutándose en https://localhost:${PORT}`);
});
