const express = require('express');
const http = require('http');

const { ApolloServer } = require('apollo-server-express');
const { RedisCache } = require('apollo-server-cache-redis');
const responseCachePlugin = require('apollo-server-plugin-response-cache');
const {resolveEnvVar} = require('./utils/misc')

const typeDefs = require('./schema/rsvp');
const resolvers = require('./resolvers/rsvp')
// data loaders
const DataLoader = require('dataloader')
const { eventBatchFn, groupBatchFn, memberBatchFn, responseBatchFn, venueBatchFn } = require('./utils/loaders_helper')
// data sources
const EventAPI = require('./datasources/restapi/event')
const VenueAPI = require('./datasources/restapi/venue')
const GroupAPI = require('./datasources/restapi/group')
const MemberAPI = require('./datasources/restapi/member')
const ResponseAPI = require('./datasources/restapi/response')
require('dotenv').config()

const PORT = 4000;
const app = express();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new RedisCache({
    host: resolveEnvVar('REDIS_CONNECT'),
    port: '6379',
    db: '11'
  }),
  cacheControl: {
    defaultMaxAge: 5,
  },
  plugins: [responseCachePlugin({
    sessionId: (requestContext) => (requestContext.request.http.headers.get('sessionid') || '11111'),
  })],
  dataSources: () => ({
    eventAPI: new EventAPI(),
    venueAPI: new VenueAPI(),
    groupAPI: new GroupAPI(),
    memberAPI: new MemberAPI(),
    responseAPI: new ResponseAPI()
  }),
  context: () => ({
    eventLoader: new DataLoader(eventBatchFn),
    groupLoader: new DataLoader(groupBatchFn),
    memberLoader: new DataLoader(memberBatchFn),
    responseLoader: new DataLoader(responseBatchFn),
    venueLoader: new DataLoader(venueBatchFn),
  })

})


apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);

apolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  //console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
})
console.log(process.env);