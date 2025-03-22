const axios = require('axios')

const ADDRESS = 'http:/localhost/'
const PORT = ':8080'
const ENDPOINT = 'http:/localhost:8080/flags'

const glassDarklyClient = {
    endpoint: ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        authorization: 'key'
    },
    getFlag: async function (flagName, context, defaultValue) {
        axios.post(this.endpoint, context, {
            headers: { ... this.headers, flagName: flagName }
        })
        .then(console.log('Context sent'))
        .catch(function (error) {
            console.log(error)
            return defaultValue            
        });
    }
}


const client = glassDarklyClient
client.getFlag('thisisaflagname', {tenantId: 'thisIsATenant'}, 'defaultValue')

