const resolveEndpoint = function (endPoint, resource) {
    return resolveHost(endPoint) + (resource ? resource : '')
}

function resolveHost(endPoint) {
    return process.env[process.env.NODE_ENV == 'production' ? 'PROD_' + endPoint : 'DEV_' + endPoint]
}

module.exports = { resolveEndpoint: resolveEndpoint }