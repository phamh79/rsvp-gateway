const { RESTDataSource } = require('apollo-datasource-rest')

class ResponseAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:9001/rsvp/v1/'
    }

    async getResponses({ num = 30, cursor = 0 }) {
        const apiResponses = await this.get(`responses/${num}/${cursor}`)
        let newCursor = cursor + num,
            responses = Array.isArray(apiResponses) ? apiResponses.map(response => this.responseReducer(response)) : []

        return {
            cursor: newCursor,
            hasMore: responses.length == num,
            records: responses
        }

    }

    async getResponseById(responseId) {
        const response = await this.get(`response/${responseId}`)
        return this.responseReducer(response)
    }

    responseReducer(response) {
        return {
            responseId: response.response_id,
            venue: this.context.dataSources.venueAPI.getVenueById(response.venue_id),
            visibility: response.visibility,
            responseFlag: response.response,
            guests: response.guests,
            memberId: this.context.dataSources.memberAPI.getMemberById(response.member_id),
            mtime: response.mtime,
            event: this.context.dataSources.eventAPI.getEventById(response.event_id),
            group: this.context.dataSources.groupAPI.getGroupById(response.group_id)
        }
    }
}

module.exports = ResponseAPI;