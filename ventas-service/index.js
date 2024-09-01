const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3001;

// Configurar CORS
app.use(cors());

// Configurar la conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'postgres',
    database: 'supermercado_antojitos',
    password: 'admin',
    port: 5432,
});

app.use(express.json());

// Crear una venta
app.post('/sales', async (req, res) => {
    const { idClient, date, details } = req.body;

    try {
        // Crear la venta
        const result = await pool.query(
            'INSERT INTO SALES (ID_CLIENT, DATE) VALUES ($1, $2) RETURNING ID_SALE',
            [idClient, date]
        );
        const idSale = result.rows[0].id_sale;

        // Crear los detalles de la venta
        for (const detail of details) {
            await pool.query(
                'INSERT INTO SALES_DETAIL (ID_SALE, ID_PRODUCT, QUANTITY, PRICE) VALUES ($1, $2, $3, $4)',
                [idSale, detail.idProduct, detail.quantity, detail.price]
            );

            // Actualizar el inventario
            await pool.query(
                'UPDATE PRODUCTS SET stock = stock - $1 WHERE ID_PRODUCT = $2',
                [detail.quantity, detail.idProduct]
            );
        }

        res.status(201).json({ idSale });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la venta');
    }
});

app.listen(port, () => {
    console.log(`Ventas service listening at http://localhost:${port}`);
});
