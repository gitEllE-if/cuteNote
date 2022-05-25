const format = require('pg-format');
const DB_CONFIG = require('../dataBaseConfig');
const dataBaseQuery = require('./query');

async function createTable(dbConnection, sql, tableName) {
    try {
        const result = await dataBaseQuery(dbConnection, format(sql, `${tableName}`));
        if (result) {
            console.log(`==> table "${tableName}" created/used`);
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(`==> table "${tableName}" create fail ` + err);
        dbConnection.end()
        return false;
    }
}

module.exports = async (dbConnection) => {
    try {
            const sqlTableNotes = `CREATE TABLE if not exists %I(
                id serial PRIMARY KEY,
                title varchar(256) not null,
                text text not null,
                date timestamp,
                img varchar(256) DEFAULT null,
                color varchar(32) DEFAULT '#ffffff',
                priority int DEFAULT 0
              )`;
            const result = await createTable(dbConnection, sqlTableNotes, DB_CONFIG.tableNotes);
            return result ? true : false;
        
    }
    catch (err) {
        dbConnection.end()
        return false;
    }
}
