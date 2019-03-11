import 'babel-polyfill'; // required to make promises work
import mysql from 'mysql';

const connection = mysql.createConnection({
        host:'localhost', 
        user: 'jmuhumuza', 
        password: 'joshua', 
        database: 'wdrDb',
        multipleStatements: true,
    });

const queryTable = async (table) => {
    
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

    // connection.end((disConnectionError) => {
    //     if(disConnectionError){
    //         console.log(disConnectionError);
    //     }
    // });
}


const assignStationId = (result, connection, table) => {
    console.log();
    console.log(`************ ${table} batch started`);
    console.log();

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
            'byd-1' : 48,
            /** duplicates to bend the rules for naming errors*/
            'jjag' : 50,
            'mak' : 53
        };

        const stationID = STATION_NAMES[stationName];

        if(stationID){
            const updateQuery = `UPDATE ${table} SET stationID = '${stationID}' WHERE id = ${id}`;

            connection.query(updateQuery, (updateError, result, fields) => { 
                if (updateError) {
                  throw updateError;
                }
              });
        } else {
            console.log(`${stationName} No station for this entry ${NAME}`)
        }

    });
    console.log();
    console.log('************')
    console.log(`${table} batch done`);
    console.log('**************');
    console.log();
}

queryTable('Electron');
// queryTable('');