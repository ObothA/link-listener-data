
function assignStationId(result, connection, table) {
    result.map((dbField) => {
        const id = dbField.id;
        const NAME = dbField.NAME;
        const stationname = dbField.stationname

        var stationName;

        if (!NAME && stationname) {
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
        } else if (!stationName) {
            // console.log(result);
        }

        const STATION_NAMES = {
            'myg': 54,
            'makg3': 53,
            'kml': 52,
            'jja': 50,
            'byd-2': 49,
            'byd-1': 48,
            /** duplicates to bend the rules for naming errors*/
            'jjag': 50,
            'mak': 53,
            'ebbg3': 52,
            'makg2': 53,
            'fos': 53,
            'fios': 53,
            'byd': 48,
            'jjag3': 50,
            'mygg3': 54,
            'jnj': 50,
        };

        const stationID = STATION_NAMES[stationName];

        if (stationID) {
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

}

module.exports = assignStationId;