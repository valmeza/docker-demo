let express = require('express');
let app = express();
var mysql = require('mysql');

let con = mysql.createConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE });

// mysql code

con.connect((err) => {
    if(err) {
        console.log('Error connecting to db: ', err);
        return;
    }
    console.log('Connection to db established.');
    con.query('CREATE TABLE IF NOT EXISTS visits(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, ts BIGINT)', (err) => {
        if(err) throw err;
    });
});

// request handling

app.get('/', (req, res) => {
    con.query('INSERT INTO visits (ts) values (?)', Date.now(), (err, dbRes) => {
        if(err) throw err;
        res.send('Hello world! You are visitor number ' + dbRes.insertId);
    });
});

// server

let server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
}); 