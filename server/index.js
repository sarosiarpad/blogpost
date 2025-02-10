require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'blogpost'
});

db.connect((err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log("MySQL Connected");
});

app.get("/posts", (req, res) => {
    db.query("SELECT * FROM POSTS ORDER BY created_at DESC", (err, results) => {
        if(err) 
            return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM POSTS WHERE id = ?", [id], (err, results) => {
        if(err) 
            return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/posts', (req, res) => {
    const { username, title, content } = req.body;
    if(!username || !title || !content)
        return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });

    db.query(
        'INSERT INTO posts (username, title, content) VALUES (?,?,?)',
        [username, title, content],
        (err, result) => {
            if(err) 
                return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, username, title, content, created_at: new Date() });
        }
    );
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
        if (err) 
            return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0)
            return res.status(404).json({ error: "A bejegyzés nem található!" });

        res.json({ message: "Bejegyzés törölve!", id });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));