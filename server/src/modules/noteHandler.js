const format = require('pg-format');
const dataBaseQuery = require('../db/modules/query');
const DB_CONFIG = require('../db/dataBaseConfig');

async function getFromDB(dataBase) {
    try {
        const sql = `SELECT * FROM %I`;
        const result = await dataBaseQuery(dataBase, format(sql, `${DB_CONFIG.tableNotes}`));
        if (result && result.rows && result.rows.length) {
            return result.rows;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log('==> failed get notes ' + err);
        return null;
    }
}

async function addToDB(dataBase, req) {
    try {
        const newNote = req.body;
        let sql = `INSERT INTO %I(%s) VALUES (%L)`;
        let result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableNotes}`, Object.keys(newNote).toString(), Object.values(newNote)));
        if (result) {
            sql = `SELECT max(id) FROM %I`;
            result = await dataBaseQuery(dataBase, format(sql,
                `${DB_CONFIG.tableNotes}`));
            result = result.rows[0].max;
        }
        return (result);
    }
    catch (err) {
        console.log('==> failed post note ' + err);
        return null;
    }
}

async function delFromDB(dataBase, req) {
    try {
        const sql = `DELETE FROM %I WHERE %I = %L;`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableNotes}`, 'id', req.params.id));
        return (result);
    }
    catch (err) {
        console.log('==> failed delete note ' + err);
        return null;
    }
}

async function patchDB(dataBase, req) {
    try {
        const sql = `UPDATE %I SET %I = %L WHERE %I = %L`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableNotes}`, 'priority', req.body.priority, 'id', req.params.id));
        return (result);
    }
    catch (err) {
        console.log('==> failed patch note ' + err);
        return null;
    }
}

async function updateDB(dataBase, req) {
    try {
        const newNote = req.body;
        const sql = `UPDATE %I SET(%s) = ROW(%L) WHERE %I = %L`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableNotes}`, Object.keys(newNote).toString(), Object.values(newNote), 'id', req.params.id));
        return (result);
    }
    catch (err) {
        console.log('==> failed update note ' + err);
        return null;
    }
}

module.exports = { getFromDB, addToDB, delFromDB, updateDB, patchDB };
