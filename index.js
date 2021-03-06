require('dotenv').load();

require('./db');
require('./models/oauth_tokens');
require('./models/oauth_clients');

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app, {
    serveClient: false
});
const debug = require('debug')('Express4');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const logger = require('morgan');

const config = require('./config');

const routes = require('./routes/index');

app.set('port', process.env.PORT || config.oauth.port);

app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', cors(), routes);

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const server = http.listen(app.get('port'), ()=>{
    debug('Express server listening on port ' + server.address().port);
})