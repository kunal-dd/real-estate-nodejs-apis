const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../api/routes/v1');
const { logs } = require('./vars');
const middlewareErrorParser = require("./../api/middleware/ErrorParser");

const app = express();

app.use(morgan(logs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compress());

app.use(methodOverride());

app.use(helmet());

app.use(cors());

app.use('/api/v1', routes);

app.use(middlewareErrorParser);

app.get('*', (req, res) => res.status(404).send({
    message: 'Page Not Found',
}))

module.exports = app;