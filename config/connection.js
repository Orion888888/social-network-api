const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/social_mediaDB';

connect(connectionString);

module.exports = connection;
