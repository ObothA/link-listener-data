const mysql = require('mysql');
const queryTable = require('./utils/queryTable');

function App(){
console.log('main called');

const connection = mysql.createConnection({
        host:'localhost', 
        user: 'jmuhumuza', 
        password: 'joshua', 
        database: 'wdrDb',
        multipleStatements: true,
    });

// queryTable('Electron');
// queryTable('GeneralTable');
queryTable('GroundNode', connection);

// setInterval(

//     , 1000);
// }

App();
}