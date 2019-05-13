const fetch = require('node-fetch')
async function eventsByIdsFn(eventIds) {
    const params = new URLSearchParams();
    for (eventId of eventIds) {
        params.append('id', eventId)
    }
    return await fetch('http://localhost:9000/rsvp/v1/events/ids/', {
        method: 'POST',
        body: params,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).catch(error => new Error(error)).then(res => res.json());
}

module.exports = {
    eventsByIdsFn: eventsByIdsFn
}
