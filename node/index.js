const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

const sqlCreateTable = 'CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255) not null, primary key (id))';
connection.query(sqlCreateTable, () => {
    const sql = `INSERT INTO people(name) values('Gabriel Petrovick');`;
    connection.query(sql);
});


app.get('/', async (req, res) => {
    const sqlSelect = 'select id, name from people';

    connection.query(sqlSelect, (err, result, fields) => {
        let html = '<h1>Full Cycle Rocks!</h1>';
        html += '<table><tr>';

        for (const value of result) {
            html += `<td>${value.name}</td>`;
        }
        
        html += '</tr></table>';
        res.send(html);
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ', port);
});

process.on('exit', function() {
    console.log('System shutting down');
    connection.end();
});

process.on('SIGTERM', () => {
    console.log('System shutting down SIGTERM');
    connection.end();
});