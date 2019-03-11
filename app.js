import 'babel-polyfill'; // required to make promises work
import mysql from 'mysql';

const func = async () => {
    const connection = await mysql.createConnection(
        {
            host:'localhost', 
            user: 'jmuhumuza', 
            password: 'joshua', 
            database: 'wdrDb',
            multipleStatements: true,
        });

    console.log(connection);

    connection.end((connectionError) => {
        console.log(connectionError);
    });
}

func();
