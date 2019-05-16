const { RESTDataSource } = require('apollo-datasource-rest')
const {resolveEndpoint} = require('../../utils/misc')
class VenueAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = resolveEndpoint('VENUE_SERVICE_ENDPOINT')

    }

    async getVenues({ num = 30, cursor = 0 }) {
        const apiVenues = await this.get(`venues/${num}/${cursor}`)
        let venues = Array.isArray(apiVenues) ? apiVenues.map(venue => this.venueReducer(venue)) : [],
            newCursor = cursor + venues.length
        return {
            cursor: newCursor,
            hasMore: venues.length == num,
            records: venues
        }

    }

    async getVenueById(venueId) {
        if (venueId == 0)
            return null
        //const venue = await this.get(`venue/${venueId}`)
        const venue = await this.context.venueLoader.load(venueId)
        return this.venueReducer(venue)
    }

    venueReducer(venue) {
        return {
            venueId: venue.venue_id,
            venueName: venue.venue_name,
            time: (new Date(venue.time)).toString(),
            venueURL: venue.venue_url,
            lon: venue.lon,
            lat: venue.lat,
            group: this.context.dataSources.groupAPI.getGroupById(venue.group_id),
        }
    }
}

module.exports = VenueAPI;