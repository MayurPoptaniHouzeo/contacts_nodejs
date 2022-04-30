const mysql = require('mysql');
const API = require('./API/api');
const api = new API();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Houzeo@123",
    port: 3306,
    database: "my_db"
});

global.con = con;

con.connect((error) => {
    if(error) {
        console.log(`Failed to connect to DB. ${error}`);
    } else {
        console.log("Connected to Database");
        api.initAPIS();
    }
});