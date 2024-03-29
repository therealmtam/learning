'use strict';

const express = require('express');
const app = express();
//--------------------
const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');

const formatDataForClient = (input) => input;

// =================
// type definitions and resolvers
// =================
const typeDefs = gql`
    type Astronaut {
        id: ID!
        name: String
    }

    type Query {
        astronaut(id: ID!): Astronaut
        astronauts: [Astronaut]
    }
`;

const resolvers = {
    Query: {
        astronaut: async (parent, args, context, info) => {
            // extract needed arguments
            const { id } = args;

            // fetch the requested data from the data source
            const responseFromDataSource = await axios.get(
                `http://localhost:3000/astronauts/${id}`
            );

            // format the data so it is in the schema defined
            const dataToReturn = formatDataForClient(
                responseFromDataSource.data
            );

            // return the data
            return dataToReturn;
        },
        astronauts: async (parent, args, context, info) => {
            // fetch the requested data from the data source
            const responseFromDataSource = await axios.get(
                `http://localhost:3000/astronauts`
            );

            // format the data so it is in the schema defined
            const dataToReturn = formatDataForClient(
                responseFromDataSource.data
            );

            // return the data
            return dataToReturn;
        },
    },
};

const serverStart = async() => {
  // =================
  // configure the server
  // =================
  const port = 4000;

  const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
  });

  // https://www.apollographql.com/docs/apollo-server/v3/integrations/middleware/#apollo-server-express - need to await the server start which starts on new ApolloServer before applying as middleware
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  // =================
  // register RESTful routes
  // =================
  app.get('/test', (req, res) => res.send('test is good!'));

  // =================
  // start / turn-on the server
  // =================
  const startExpressServer = new Promise ((resolve, reject) => {
    app.listen({ port }, () => {
        console.log(
            `Graphql endpoint is at http://localhost:${port}${apolloServer.graphqlPath}`
        );
        console.log(
            `RESTful endpoints are ready too! => http://localhost:${port}/_your_endpoint_path_`
        );
        resolve()
    });
  })

  await startExpressServer
}

// start the server
serverStart()