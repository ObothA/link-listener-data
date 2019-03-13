const mysql = require('mysql');
const queryTable = require('./utils/queryTable');


function App(){
const connection = mysql.createConnection({
        host:'localhost', 
        user: 'jmuhumuza', 
        password: 'joshua', 
        database: 'wdrDb',
        multipleStatements: true,
    });

// queryTable('Electron');
// queryTable('GeneralTable');

var status = true;
status = queryTable('GroundNode', connection);

setInterval(function(){
    if(!status){
        queryTable('GroundNode', connection);
    } else {
        console.log('######## table is linked  ########');
    }
}, 5000);
}



App();