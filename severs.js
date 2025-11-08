import express from "express";
import cors from "cors";
import pkg from "pg";
import pool from './db.js';

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());




app.get("/posts", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los posts");
    }
});


app.post("/posts", async (req, res) => {
    try {
        const { titulo, img, descripcion } = req.body;
        const result = await pool.query(
            "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *",
            [titulo, img, descripcion]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear el post");
    }
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
