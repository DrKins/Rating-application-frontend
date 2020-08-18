const path = require('path');
const config = {}


config.location_key = path.resolve(__dirname, '../certs/privkey.pem');
config.location_chain = path.resolve(__dirname, '../certs/chain.pem');
config.location_cert = path.resolve(__dirname, '../certs/cert.pem');
config.port=80;
config.port2=443;
module.exports =config;
