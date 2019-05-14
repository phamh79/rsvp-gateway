const { ApolloServer } = require('apollo-server');

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
    venueLoader: new DataLoader(venueBatchFn)
  })
})
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});