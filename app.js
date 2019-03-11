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


    const QUERY = 'SELECT * FROM Electron WHERE id=1';
    const RESULT = await connection.execute(QUERY);
    console.log(RESULT);

    connection.end((connectionError) => {
        console.log(connectionError);
    });
}

func();
console.log('outsyd function');