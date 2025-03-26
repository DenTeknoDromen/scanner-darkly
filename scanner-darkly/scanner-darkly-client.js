const axios = require('axios')

class scannerDarklyClient {
    constructor(endpoint, auth) {
        this.endpoint = `${endpoint}/flags`
        this.headers = {
            'Content-Type': 'application/json',
            authorization: auth
        }
    }
    async getFlag(flagName, context, defaultValue = false) {
        try {        
            const data = { context: {
                flagname: flagName,
                ...context
            }}
            axios.post(this.endpoint, data)
            .then(function (response) {
                let output = response.data.flagValue
                output = (output === 'Disabled') ? false : output
                output = (output === 'Enabled') ? true : output
                console.log(output)
                return output                
            })
        } catch (error) {
            console.log(error)
            return defaultValue
        }   
    }
}

module.exports = {
    scannerDarklyClient
}

