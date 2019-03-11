import 'babel-polyfill'; // required to make promises work
import mysql from 'mysql';


const queryTable = async (table) => {
    const connection = await mysql.createConnection(
        {
            host:'localhost', 
            user: 'jmuhumuza', 
            password: 'joshua', 
            database: 'wdrDb',
            multipleStatements: true,
        });


    const QUERY_OTHER_TABLES = `SELECT id,NAME FROM ${table} WHERE stationID=111`;
    const QUERY_ELECTRON  = `SELECT id,stationname FROM ${table} WHERE stationID=111`

    var QUERY;
    if(table === 'Electron'){
        QUERY = QUERY_ELECTRON;
    } else {
        QUERY = QUERY_OTHER_TABLES;
    }

    connection.query(QUERY, (queryError, result, fields) => {
        if (queryError) {
            throw queryError;
        } else {
            assignStationId(result,connection,table);
        }
    });

    connection.end((disConnectionError) => {
        if(disConnectionError){
            console.log(disConnectionError);
        }
    });
}


const assignStationId = (result, connection, table) => {
    result.map((dbField) => {
        const { id,NAME, stationname } = dbField;

        let stationName;

        if(!NAME && stationname){
            stationName = stationname; 
        }
        
        if (NAME && NAME.includes('-')) {
            stationName = NAME.split('-')[0];
            var stationNumber = NAME.split('-')[1];
            if (!isNaN(stationNumber)) {
                stationName = `${stationName}-${stationNumber}`;
            }
        } else if (NAME && NAME.includes('_')) {
            stationName = NAME.split('_')[0];
            var stationNumber2 = NAME.split('_')[1];
            if (!isNaN(stationNumber2)) {
                stationName = `${stationName}_${stationNumber2}`;
            }
        }

        const STATION_NAMES = {
            'myg' : 54,
            'makg3' : 53,
            'kml' : 52,
            'jja' : 50,
            'byd-2' : 49,
            'byd-1' : 48
        };

        console.log(STATION_NAMES[stationName]);

        const updateQuery = `UPDATE ${table} SET stationID = '${StationID}' WHERE id = ${id}`;


    });
}

queryTable('Electron');