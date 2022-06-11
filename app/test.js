const redis = require('redis');

const client = redis.createClient();
client.on('error', (err) => console.log('Redis client error', err));
client.connect();

client.get("Publisher")
    .then(x => console.log(x));