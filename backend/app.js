const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
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

// Middleware para habilitar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para recibir las reservas
app.post('/reservas', (req, res) => {
    const reservas = req.body;

    // Validar que el cuerpo de la solicitud contenga reservas
    if (!Array.isArray(reservas) || reservas.length === 0) {
        return res.status(400).json({
            message: 'El formato de las reservas es incorrecto o está vacío.',
        });
    }

    // Insertar las reservas en la base de datos
    const query = `INSERT INTO reservas (nombre, apellido, restriccion) VALUES ?`;
    const values = reservas.map((reserva) => [reserva.nombre, reserva.apellido, reserva.restriccion]);

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error('Error al guardar las reservas:', err);
            return res.status(500).json({
                message: 'Error al guardar las reservas en la base de datos.',
                error: err
            });
        }

        console.log('Reservas guardadas:', result);
        res.status(200).json({
            message: 'Reservas recibidas y guardadas correctamente.',
            totalReservas: reservas.length,
        });
    });
});

app.post('/canciones', (req, res) => {
    const { cancion } = req.body;

    if (!cancion || typeof cancion !== 'string') {
        return res.status(400).json({
            message: 'Se intentó agregar una canción vacía.',
        });
    }

    const query = `INSERT INTO canciones (cancion) VALUES (?)`;

    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error al obtener la conexión:', err);
            return res.status(500).json({
                message: 'Error al conectar con la base de datos.',
                error: err
            });
        }

        connection.query(query, [cancion], (err, result) => {
            connection.release(); // Libera la conexión al pool

            if (err) {
                console.error('Error al guardar la canción:', err);
                return res.status(500).json({
                    message: 'Error al guardar la canción en la base de datos.',
                    error: err
                });
            }

            console.log('Canción guardada:', result);
            res.status(200).json({
                message: 'Canción recibida y guardada correctamente.',
            });
        });
    });
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
