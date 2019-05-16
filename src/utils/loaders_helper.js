const fetch = require('node-fetch')
const {resolveEndpoint} = require('./misc')
async function eventBatchFn(eventIds) {
    const params = new URLSearchParams();
    for (eventId of eventIds) {
        params.append('id', eventId)
    }
    let events = await fetch(resolveEndpoint('EVENT_SERVICE_ENDPOINT', 'events/ids/'), {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).catch(error => new Error(error)).then(res => res.json());

    return ensureOrder({
        docs: events,
        keys: eventIds,
        prop: "event_id",
        error: id => `event does not exist (${id})`
    });
}

async function groupBatchFn(groupsIds) {
    const params = new URLSearchParams();
    const normalizedIds = new Array()
    for (groupId of groupsIds) {
        params.append('id', groupId)
        normalizedIds.push(parseInt(groupId))
    }
    let groups = await fetch(resolveEndpoint('GROUP_SERVICE_ENDPOINT', 'groups/ids/'), {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).catch(error => new Error(error)).then(res => res.json());

    return ensureOrder({
        docs: groups,
        keys: normalizedIds,
        prop: "group_id",
        error: id => `group does not exist (${id})`
    });
}


async function memberBatchFn(membersIds) {
    const params = new URLSearchParams();
    const normalizedIds = new Array()
    for (memberId of membersIds) {
        params.append('id', memberId)
        normalizedIds.push(parseInt(memberId))
    }
    let members = await fetch(resolveEndpoint('MEMBER_SERVICE_ENDPOINT', 'members/ids/'), {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).catch(error => new Error(error)).then(res => res.json());

    return ensureOrder({
        docs: members,
        keys: normalizedIds,
        prop: "member_id",
        error: id => `member does not exist (${id})`
    });
}

async function responseBatchFn(responsesIds) {
    const params = new URLSearchParams();
    const normalizedIds = new Array()
    for (responseId of responsesIds) {
        params.append('id', responseId)
        normalizedIds.push(parseInt(responseId))
    }
    let responses = await fetch(resolveEndpoint('RESPONSE_SERVICE_ENDPOINT', 'responses/ids/'), {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).catch(error => new Error(error)).then(res => res.json());

    return ensureOrder({
        docs: responses,
        keys: normalizedIds,
        prop: "response_id",
        error: id => `response does not exist (${id})`
    });
}


async function venueBatchFn(venuesIds) {
    const params = new URLSearchParams();
    const normalizedIds = new Array()
    for (venueId of venuesIds) {
        params.append('id', venueId)
        normalizedIds.push(parseInt(venueId))
    }
    let venues = await fetch(resolveEndpoint('VENUE_SERVICE_ENDPOINT', 'venues/ids/'), {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).catch(error => new Error(error)).then(res => res.json());

    return ensureOrder({
        docs: venues,
        keys: normalizedIds,
        prop: "venue_id",
        error: id => `venue does not exist (${id})`
    });
}

module.exports = {
    eventBatchFn: eventBatchFn,
    groupBatchFn: groupBatchFn,
    memberBatchFn: memberBatchFn,
    responseBatchFn: responseBatchFn,
    venueBatchFn: venueBatchFn,
}

const ensureOrder = options => {
    const {
        docs,
        keys,
        prop,
        error = key => `Data does not exist for (${key})`
    } = options;
    const docsMap = new Map();
    docs.forEach(doc => docsMap.set(doc[prop], doc));
    return keys.map(key => {
        return (
            docsMap.get(key) ||
            new Error(typeof error === "function" ? error(key) : error)
        );
    });
};