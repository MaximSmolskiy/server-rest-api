const low = require('lowdb');
const lodashId = require('lodash-id');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('./services/db.json');
const db = low(adapter);

db.then(db => db._.mixin(lodashId));

db.then(db => db.defaults({employees: []}).write());

module.exports = db;
