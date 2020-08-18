const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const app = express();
const https = require('https');
const fs = require('fs');
/**
 * Load secret variables
 */
const config = require("./config");
app.use(express.json());
app.use(cors());
app.use(history());
// Configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '../dist')));
// To serve project on different page route
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

https.createServer({
    key: fs.readFileSync(config.location_key),
    cert: fs.readFileSync(config.location_cert),
    ca: fs.readFileSync(config.location_chain)
}, app).listen(config.port2, () => {
    console.log(`Listening on ${
        config.port2
    }`);
});

app.listen(config.port, () => console.log(`Listening on ${
    config.port
}`));
