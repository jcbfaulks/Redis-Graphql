const redis = require('redis');
const fastify = require('fastify');
const graphql = require('mercurius');
const fs = require('fs');
const schema = fs.readFileSync(__dirname + '/redis-schema.gql').toString();

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '4000';

const client = redis.createClient();
client.on('error', (err) => console.log('Redis client error', err));
client.connect();

const resolvers = {
    Query: {
        ping: async (_) => await client.ping(),
        get: async (_, {key}) => (await client.get(key)),
        hget: async (_, {key, field}) => await client.hGet(key, field)
    },
    Mutation: {
        set: async (_, {key, value}) => await client.set(key, value),
        hset: async (_, {key, field, value}) => await client.hSet(key, field, value),
        incr: async(_, {key}) => await client.incr(key),
        decr: async(_, {key}) => await client.decr(key)
    }
};

const server = fastify()

server
    .register(graphql, {schema, resolvers, graphiql: true })
    .listen(PORT, HOST, () => {
        console.log(`Producer running at http://${HOST}:${PORT}/graphql`)
    });