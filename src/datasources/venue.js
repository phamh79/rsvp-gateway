const { RESTDataSource } = require('apollo-datasource-rest')

class VenueAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:9003/rsvp/v1/'

    }

    async getVenues({ num = 30, cursor = 0 }) {
        const apiVenues = await this.get(`venues/${num}/${cursor}`)
        let newCursor = cursor + num,
            venues = Array.isArray(apiVenues) ? apiVenues.map(venue => this.venueReducer(venue)) : []

        return {
            cursor: newCursor,
            hasMore: venues.length == num,
            records: venues
        }

    }

    async getVenueById(venueId) {
        if (venueId == 0)
            return null
        const venue = await this.get(`venue/${venueId}`)
        return this.venueReducer(venue)
    }

    venueReducer(venue) {
        return {
            venueId: venue.venue_id,
            venueName: venue.venue_name,
            time: venue.time,
            venueURL: venue.venue_url,
            group: this.context.dataSources.groupAPI.getGroupById(venue.group_id),
        }
    }
}

module.exports = VenueAPI;