const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3003;

// Configurar la conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'supermercado_antojitos',
    password: 'admin',
    port: 5432,
});

app.use(express.json());

// Obtener clientes
app.get('/clients', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM CLIENTS');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener clientes');
    }
});

// Crear cliente
app.post('/clients', async (req, res) => {
    const { idType, firstName, lastName, phone, address } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO CLIENTS (ID_TYPE, FIRST_NAME, LAST_NAME, PHONE, ADDRESS) VALUES ($1, $2, $3, $4, $5) RETURNING ID_CLIENT',
            [idType, firstName, lastName, phone, address]
        );
        res.status(201).json({ idClient: result.rows[0].id_client });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear cliente');
    }
});

app.listen(port, () => {
    console.log(`Clientes service listening at http://localhost:${port}`);
});
