const mysql = require('mysql');
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'air'
})

connexion.connect((error) => {
    if (error) {
        console.error('Erreur:' + error);
        return
    }
    console.log('connect to mysql');
})
module.exports = connexion;