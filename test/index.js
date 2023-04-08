const client = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/api/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) =>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

app.get('/api/users/:id', (req, res) => {
    client.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, result) =>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

app.post('/api/users', (req, res) => {
    const user = req.body;
    let insertQuery = `INSERT INTO users(id, firstname, lastname, location) VALUES(${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}')`;

    client.query(insertQuery, (err, result) =>{
        if(!err){
            res.send('User added!');
        }
        else{
            res.send(err.message);
        }
    });
    client.end;
});

app.put('/api/users/:id', (req, res) => {
    let user = req.body;
    let updateQuery =   `UPDATE users SET 
                        firstname = '${user.firstname}', 
                        lastname = '${user.lastname}', 
                        location = '${user.location}'
                        WHERE id = ${user.id}`;
    
    client.query(updateQuery, (err, result) =>{
        if(!err){
            res.send('User updated !');
        }
        else{
            res.send(err.message);
        }
    });
    client.end;
});

app.delete('/api/users/:id', (req, res) => {
    let deleteQuery = `DELETE FROM users WHERE id=${req.params.id}`;

    client.query(deleteQuery, (err, result) =>{
        if(!err){
            res.send('User deleted !');
        }
        else{
            res.send(err.message);
        }
    });
    client.end;
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port} . . .`));

client.connect();