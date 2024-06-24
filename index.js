const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "",
    database: "employeesystem"
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log('Error fetching employees:', err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create', (req, res) => {
    const { name, age, country, position, wage } = req.body;
    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)",
        [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log('Error inserting employee:', err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.put('/update', (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;

    db.query(
        "UPDATE employees SET wage = ? WHERE id = ?",
        [wage, id],
        (err, result) => {
            if (err) {
                console.log('Error updating wage:', err);
                res.status(500).send(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, 
        (err, result) => {
        if (err) {
            console.log('Error updating wage:', err);
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    })
})

app.listen(5173, () => {
    console.log('Server is running on port 5173');
});
