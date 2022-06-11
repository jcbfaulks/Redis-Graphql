const fastify = require('fastify');
const graphql = require('mercurius');
const fs = require('fs');
const schema = fs.readFileSync(__dirname + '/graphql-schema.gql').toString();

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '4000';

const resolvers = {
    Query: {
        pid: () => { 
            console.log(process.pid);
            return process.pid
        },
        recipe: async (_, {id}) => {
            console.log(id);
            if (id !== "42") throw new Error(`recipe ${id} not found`);
            return {
                id: 42, 
                name: 'Chicken Tikka Masala',
                steps: "Throw it in a pot..."
            }
        }
    },
    Recipe: {
        ingredients: async (obj) => {
            return(obj.id !== 42) ? [] : [
                { id: 1, name: "Chicken", quantity: "1 lb" },
                { id: 2, name: "Sauce", quantity: "2 cups" }
            ]
        }
    }
};

const server = fastify();

server
    .register(graphql, {schema, resolvers, graphiql: true })
    .listen(PORT, HOST, () => {
        console.log(`Producer running at http://${HOST}:${PORT}/graphql`)
    });
