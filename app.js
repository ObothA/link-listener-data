const mysql = require('mysql');
const queryTable = require('./utils/queryTable');


function App() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'jmuhumuza',
        password: 'joshua',
        database: 'wdrDb',
        multipleStatements: true,
    });


    var table_counter = 1;
    var tables = {
        1 : 'Electron',
        2 : 'GeneralTable',
        3 : 'GroundNode',
        4 : 'SinkNode',
        5 : 'TenMeterNode',
        6 : 'TwoMeterNode'
    }

    setInterval(function () {
        if(table_counter < 7){
            table_counter = table_counter + 1;
            queryTable(tables[table_counter], connection);
            console.log(`table counter is ${table_counter}`)
        } else {
            table_counter = 1;
        }
    }, 5000);
}

App();