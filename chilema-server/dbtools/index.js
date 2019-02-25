var mysql = require('mysql');
var HOST = 'localhost';
var USER = 'root';
var PASSWORD = '';
var DATABASE = 'chilema';

function select(sql, callback) {
    var connection = mysql.createConnection({
        host     : HOST,
        user     : USER,
        password : PASSWORD,
        database : DATABASE
      });
       
      connection.connect();
       
      connection.query(sql, callback);

      connection.end();
}

function insert(sql, data, callback) {
    var connection = mysql.createConnection({
        host     : HOST,
        user     : USER,
        password : PASSWORD,
        database : DATABASE
      });

    connection.connect();
    connection.query(sql, data, callback);
    connection.end();
}

function update(sql, callback) {
    var connection = mysql.createConnection({
        host     : HOST,
        user     : USER,
        password : PASSWORD,
        database : DATABASE
      });

    connection.connect();
    connection.query(sql, callback);
    connection.end();
}

module.exports = {
    select: select,
    insert: insert,
    update: update
}