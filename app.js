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


    var table_counter = 0;
    var tables = {
        1 : 'Electron',
        2 : 'GeneralTable',
        3 : 'GroundNode',
        4 : 'SinkNode',
        5 : 'TenMeterNode',
        6 : 'TwoMeterNode'
    }

    setInterval(function () {
        if(table_counter < 6){
            queryTable(tables[table_counter], connection);
            table_counter = table_counter + 1;
        } else {
            table_counter = 0;
        }
    }, 5000);
}

App();