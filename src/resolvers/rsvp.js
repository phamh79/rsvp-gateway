module.exports = {
    Query: {
        events: function (parent, args, context, info) {
            return context.dataSources.eventAPI.getEvents(args);
        },
        eventById: function (parent, args, context, info) {
            const id = args.id
            return context.dataSources.eventAPI.getEventById(id);
        },
        responses: function (parent, args, context, info) {
            return context.dataSources.responseAPI.getResponses(args);
        },
        responseById: function (parent, args, context, info) {
            const id = args.id
            return context.dataSources.responseAPI.getResponseById(id);
        },
        groups: function (parent, args, context, info) {
            return context.dataSources.groupAPI.getGroups(args);
        },
        groupById: function (parent, args, context, info) {
            const id = args.id
            return context.dataSources.groupAPI.getGroupById(id);
        },
        members: function (parent, args, context, info) {
            return context.dataSources.memberAPI.getMembers(args);
        },
        memberById: function (parent, args, context, info) {
            const id = args.id
            return context.dataSources.memberAPI.getMemberById(id);
        },
        venues: function (parent, args, context, info) {
            return context.dataSources.venueAPI.getVenues(args);
        },
        venueById: function (parent, args, context, info) {
            const id = args.id
            return context.dataSources.venueAPI.getVenueById(id);
        },
    }
}