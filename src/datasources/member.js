const { RESTDataSource } = require('apollo-datasource-rest')
class MemberAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:9002/rsvp/v1/'
    }

    async getMembers({ num = 30, cursor = 0 }) {
        const apiMembers = await this.get(`members/${num}/${cursor}`)
        let newCursor = cursor + num,
            members = Array.isArray(apiMembers) ? apiMembers.map(member => this.memberReducer(member)) : []

        return {
            cursor: newCursor,
            hasMore: members.length == num,
            records: members
        }

    }

    async getMemberById(memberId) {
        const member = await this.get(`member/${memberId}`)
        return this.memberReducer(member)
    }

    memberReducer(member) {
        return {
            memberName: member.member_name,
            memberId: member.member_id,
            time: member.time,
            memberURL: member.member_url,
        }
    }
}

module.exports = MemberAPI;