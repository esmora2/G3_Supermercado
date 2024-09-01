const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3002;

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

// Crear un producto
app.post('/products', async (req, res) => {
    const { description, price, stock } = req.body;

    try {
        await pool.query(
            'INSERT INTO PRODUCTS (DESCRIPTION, PRICE, STOCK) VALUES ($1, $2, $3)',
            [description, price, stock]
        );
        res.status(201).send('Producto creado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el producto');
    }
});

// Obtener productos
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM PRODUCTS');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener productos');
    }
});

// Crear un Kardex
app.post('/kardex', async (req, res) => {
    const { idProduct, idTypeTransaction, idTransaction, quantity, price } = req.body;

    try {
        await pool.query(
            'INSERT INTO KARDEX (ID_PRODUCT, ID_TYPE_TRANSACTION, ID_TRANSACTION, QUANTITY, PRICE) VALUES ($1, $2, $3, $4, $5)',
            [idProduct, idTypeTransaction, idTransaction, quantity, price]
        );
        res.status(201).send('Kardex registrado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar el Kardex');
    }
});

// Actualizar stock de producto
app.post('/products/:id/stock', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        await pool.query(
            'UPDATE PRODUCTS SET stock = stock + $1 WHERE ID_PRODUCT = $2',
            [quantity, id]
        );
        res.status(200).send('Stock actualizado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el stock');
    }
});

app.listen(port, () => {
    console.log(`Inventario service listening at http://localhost:${port}`);
});
