const { RESTDataSource } = require('apollo-datasource-rest')
const {resolveEndpoint} = require('../../utils/misc')
class MemberAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = resolveEndpoint('MEMBER_SERVICE_ENDPOINT')
    }

    async getMembers({ num = 30, cursor = 0 }) {
        const apiMembers = await this.get(`members/${num}/${cursor}`)
        let members = Array.isArray(apiMembers) ? apiMembers.map(member => this.memberReducer(member)) : [],
            newCursor = cursor + members.length
        return {
            cursor: newCursor,
            hasMore: members.length == num,
            records: members
        }

    }

    async getMemberById(memberId) {
        let member;
        try {
            //member = await this.get(`member/${memberId}`)
            member = await this.context.memberLoader.load(memberId)
        } catch (error) {
            console.log(error)
            return null
        }
        
        return this.memberReducer(member)
    }

    memberReducer(member) {
        return {
            memberId: member.member_id,
            memberName: member.member_name,
            photo: member.photo,
            other_services: member.other_services
        }
    }
}

module.exports = MemberAPI;