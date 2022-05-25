const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
var path = require('path');
const dataBaseCreate = require('./modules/dataBaseHandler');
const handleRequest = require('./modules/requestHandler');

const app = express();
const port = process.env.PORT || 5055;

app.use(express.static(`${__dirname}/../../dist`));
app.use(serveStatic(__dirname + "/../../dist"));
app.use(express.json({limit: '50mb'}));
app.use(history());


let dataBase;
dataBaseCreate().then((res) => (dataBase = res));

app.get('/notes', async (req, res) => {
    handleRequest(dataBase, req, res, 'get');
});
app.post('/note', async (req, res) => {
    handleRequest(dataBase, req, res, 'add');
});
app.put('/note/:id', async (req, res) => {
    handleRequest(dataBase, req, res, 'update');
});
app.patch('/note/:id', async (req, res) => {
    handleRequest(dataBase, req, res, 'patch');
});
app.delete('/note/:id', async (req, res) => {
    handleRequest(dataBase, req, res, 'del');
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
});

app.listen(port, () => { console.log(`listen at port ${port}...`); });
