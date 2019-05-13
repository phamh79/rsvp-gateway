const fetch = require('node-fetch')
async function eventBatchFn(eventIds) {
    const params = new URLSearchParams();
    for (eventId of eventIds) {
        params.append('id', eventId)
    }
    let events = await fetch('http://localhost:9000/rsvp/v1/events/ids/', {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).catch(error => new Error(error)).then(res => res.json());

    return ensureOrder({
        docs: events,
        keys: eventIds,
        prop: "event_id",
        error: id => `Event does not exist (${id})`
    });
}

async function responseBatchFn(responsesIds) {
    const params = new URLSearchParams();
    const normalizedIds = new Array()
    for (responseId of responsesIds) {
        params.append('id', responseId)
        normalizedIds.push(parseInt(responseId))
    }
    let responses = await fetch('http://localhost:9001/rsvp/v1/responses/ids/', {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).catch(error => new Error(error)).then(res => res.json());

    return ensureOrder({
        docs: responses,
        keys: normalizedIds,
        prop: "response_id",
        error: id => `Response does not exist (${id})`
    });
}

module.exports = {
    eventBatchFn: eventBatchFn,
    responseBatchFn: responseBatchFn
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