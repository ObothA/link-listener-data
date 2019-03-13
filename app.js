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

    var status = true;
    status = queryTable(tables[table_counter], connection);

    setInterval(function () {
        if (!status) {
            queryTable(tables[table_counter], connection);
        } else {
            console.log(`########  ${tables[table_counter]} is linked  ########`);
            table_counter++;
            status = false;
        }
    }, 5000);
}

App();