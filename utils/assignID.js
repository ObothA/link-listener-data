import 'babel-polyfill'; // required to make promises work

export const assignStationId = (result, connection, table) => {
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