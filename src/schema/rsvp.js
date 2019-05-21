const { gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');
module.exports = typeDefs = gql`

    type Query  {
        # Queries for events
        events(num: Int cursor: Int): EventsResult!
        eventById(id: ID!): Event
        #Queries for groups
        groups(num: Int cursor: Int): GroupsResult!
        groupById(id: ID!): Group
        #Queries for members
        members(num: Int cursor: Int): MembersResult!
        memberById(id: ID!): Member
        #Queries for response
        responses (num: Int cursor: Int) : ResponsesResult!
        responseById(id: ID!): Response
        #Queries for venue
        venues(num: Int cursor: Int): VenuesResult!
        venueById(id: ID!): Venue
        ##Who I am
        me: User
    }

    type Mutation {
        ## TODO Error: The type of Mutation.addEvents(event:) must be Input Type but got: [Event]!.
        #addEvents(event: [Event]!): EventUpdateResponse!
        deleteEvent(eventId: ID!): EventUpdateResponse!
        login(email: String): String # login token
    }

    type EventsResult {
        cursor: Int!
        hasMore: Boolean!
        records: [Event]!
    }

    type MembersResult {
        cursor: Int!
        hasMore: Boolean!
        records: [Member]!
    }

    type GroupsResult {
        cursor: Int!
        hasMore: Boolean!
        records: [Group]!
    }

    type ResponsesResult @cacheControl(maxAge: 60) {
        cursor: Int!
        hasMore: Boolean!
        records: [Response]! 
    }

    type VenuesResult {
        cursor: Int!
        hasMore: Boolean!
        records: [Venue]!
    } 

    type Event {
        eventName: String
        eventId: String
        time: String
        eventURL: String
        venue: Venue
    }

    type Response @cacheControl(maxAge: 60){
        responseId: Int!
        member: Member
        venue: Venue
        visibility: String
        responseFlag: String
        guests: Int
        mtime: String
        event: Event
        group : Group 
    }

    type Group {
        groupId: Int!
        groupTopics: [GroupTopic]
        groupCity: String
        groupCountry: String
        groupName: String
        groupLon: Float
        groupLat: Float
        groupUrlname: String
    }

    type GroupTopic {
        urlkey:    String
        topic_name: String
    }

    type Member {
        memberId: Int!
        photo: String
        memberName: String
        other_services: OtherServices
    }

    type OtherServices {
        tumblr : Tumblr
        twitter: Twitter
        linkedin: Linkedin
        flickr: Flickr
        facebook: Facebook
    }

    type Tumblr {
        identifier: String
    }

    type Twitter {
        identifier: String
    }

    type Linkedin {
        identifier: String
    }

    type Flickr {
        identifier: String
    }
    type Facebook {
        identifier: String
    }

    type Venue {
        venueId: Int
        venueName: String
        lon: Float
        lat: Float
        group: Group
    }

    type User {
        id: ID!
        email: String!
        events: [Event]!
    }

    type EventUpdateResponse {
        success: Boolean!
        message: String
        event: [Event]
    }

    enum FLAG {
        TRUE
        FALSE
    }
    
`;



const UINT64 = new GraphQLScalarType({
    name: 'uint64',
    description: 'unsigned 64 bit integer ',
    serialize(value) {
        let result;
        // Implement your own behavior here by setting the 'result' variable
        return result;
    },
    parseValue(value) {
        let result;
        // Implement your own behavior here by setting the 'result' variable
        return result;
    },
    parseLiteral(ast) {
        switch (ast.kind) {
            // Implement your own behavior here by returning what suits your needs
            // depending on ast.kind
        }
    }
});