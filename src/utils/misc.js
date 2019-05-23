const resolveEndpoint = function (endPoint, resource) {
    return resolveHost(endPoint) + (resource ? resource : '')
}

function resolveHost(endPoint) {
    return process.env[process.env.NODE_ENV == 'production' ? 'PROD_' + endPoint : 'DEV_' + endPoint]
}

/** resolve enviroment variable if present use it; else use dft value */
function resolveEnvVar(variable) {
    let env = process.env[variable]
    return env ? env : 'localhost'
}

module.exports = { resolveEndpoint, resolveEnvVar }