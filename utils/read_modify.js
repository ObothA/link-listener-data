import 'babel-polyfill'; // required to make promises work
import mysql from 'mysql';

import { assignStationId } from '../utils/assignID';

export const queryTable = async (table) => {
    const connection = await mysql.createConnection(
        {
            host:'localhost', 
            user: 'jmuhumuza', 
            password: 'joshua', 
            database: 'wdrDb',
            multipleStatements: true,
        });


    const QUERY = `SELECT id,NAME,stationname FROM ${table} WHERE stationID=111`;
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
