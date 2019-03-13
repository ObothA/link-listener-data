const assignStationId = require('./assignStationId');

function queryTable(table, connection){
    const QUERY_TABLES_NAME = `SELECT id,NAME FROM ${table} WHERE stationID=111 LIMIT 5`;
    const QUERY_TABLES_NO_NAME  = `SELECT id,stationname FROM ${table} WHERE stationID=111 LIMIT 5`

    var QUERY;
    if(table === 'Electron' || table === 'GeneralTable'){
        QUERY = QUERY_TABLES_NO_NAME;
    } else {
        QUERY = QUERY_TABLES_NAME;
    }

    connection.query(QUERY, (queryError, result, fields) => {
        if (queryError) {
            throw queryError;
        } else {
            assignStationId(result,connection,table);
        }
    });
}

module.exports = queryTable;