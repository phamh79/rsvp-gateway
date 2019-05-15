const { RESTDataSource } = require('apollo-datasource-rest')


class EventAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:9000/rsvp/v1/'
    }

    async getEvents({ num = 30, cursor = 0 }) {
        const apiEvents = await this.get(`events/${num}/${cursor}`)
        let events = Array.isArray(apiEvents) ? apiEvents.map(event => this.eventReducer(event)) : [],
            newCursor = cursor + events.length

        return {
            cursor: newCursor,
            hasMore: events.length == num,
            records: events
        }

    }

    async getEventById(eventId) {
        //const event = await this.get(`event/${eventId}`)
        const event = await this.context.eventLoader.load(eventId)
        return this.eventReducer(event)
        
    }

    eventReducer(event) {
        return {
            eventName: event.event_name,
            eventId: event.event_id,
            time: (new Date(event.time)).toString(),
            eventURL: event.event_url,
            venue: this.context.dataSources.venueAPI.getVenueById(event.venue_id),
        }
    }
}

module.exports = EventAPI;