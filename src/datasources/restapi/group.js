const { RESTDataSource } = require('apollo-datasource-rest')
class GroupAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:9006/rsvp/v1/'
    }

    async getGroups({ num = 30, cursor = 0 }) {
        const apiGroups = await this.get(`groups/${num}/${cursor}`)
        let newCursor = cursor + num,
            groups = Array.isArray(apiGroups) ? apiGroups.map(group => this.groupReducer(group)) : []

        return {
            cursor: newCursor,
            hasMore: groups.length == num,
            records: groups
        }

    }

    async getGroupById(groupId) {
        const group = await this.get(`group/${groupId}`)
        return this.groupReducer(group)
    }

    groupReducer(group) {
        return {
            groupId: group.group_id,
            groupCity: group.group_city,
            groupCountry: group.group_country,           
            groupName: group.group_name,
            groupLon: group.group_lon,
            groupLat: group.group_lat,
            groupUrlname: group.group_urlname,
            groupTopics: group.group_topics
        }
    }
}

module.exports = GroupAPI;