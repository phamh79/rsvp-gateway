const { ApolloServer } = require('apollo-server');
const schema = require('./schema/rsvp');
const resolvers = require('./resolvers/rsvp')
const EventAPI = require('./datasources/event')
const VenueAPI = require('./datasources/venue')
const GroupAPI = require('./datasources/group')
const MemberAPI = require('./datasources/member')
const ResponseAPI = require('./datasources/response')

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources: () => ({
    eventAPI: new EventAPI(),
    venueAPI: new VenueAPI(),
    groupAPI: new GroupAPI(),
    memberAPI: new MemberAPI(),
    responseAPI: new ResponseAPI()
  })
})
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});