const { RESTDataSource } = require('apollo-datasource-rest')
const {resolveEndpoint} = require('../../utils/misc')
class ResponseAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = resolveEndpoint('RESPONSE_SERVICE_ENDPOINT')
    }

    async getResponses({ num = 30, cursor = 0 }) {
        const apiResponses = await this.get(`responses/${num}/${cursor}`)
        let responses = Array.isArray(apiResponses) ? apiResponses.map(response => this.responseReducer(response)) : [],
            newCursor = cursor + responses.length
        return {
            cursor: newCursor,
            hasMore: responses.length == num,
            records: responses
        }

    }

    async getResponseById(responseId) {
        //const response = await this.get(`response/${responseId}`)
        const response = await this.context.responseLoader.load(responseId)
        return this.responseReducer(response)
    }

    responseReducer(response) {
        return {
            responseId: response.response_id,
            venue: this.context.dataSources.venueAPI.getVenueById(response.venue_id),
            visibility: response.visibility,
            responseFlag: response.response,
            guests: response.guests,
            member: this.context.dataSources.memberAPI.getMemberById(response.member_id),
            mtime: (new Date(response.mtime)).toString(),
            event: this.context.dataSources.eventAPI.getEventById(response.event_id),
            group: this.context.dataSources.groupAPI.getGroupById(response.group_id)
        }
    }
}

module.exports = ResponseAPI;