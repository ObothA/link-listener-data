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

    var status = false;
    // status = queryTable(tables[table_counter], connection);

    setInterval(function () {
        if (!status) {
            status = queryTable(tables[table_counter], connection);
            console.log(`status is ${status}`);
        } else if(table_counter < 7){
            console.log(`########  ${tables[table_counter]} is linked  ########`);
            table_counter = table_counter + 1;
            console.log(`table counter is ${table_counter}`)
            status = false;
            console.log(`status is ${status}`);
        }
    }, 5000);
}

App();