const axios = require('axios')

class ScannerDarklyClient {
    constructor(endpoint, auth) {
        this.endpoint = `${endpoint}/flags`
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        }
        this.lastValue = false
    }

    get lastValue() {
        return this._lastValue
    }
    set lastValue(newValue) {
        this._lastValue = newValue
    }

    async getFlag(flagName, context, defaultValue = false) {
        try {        
            const data = { context: {
                flagname: flagName,
                ...context
            }}
            const output = axios.post(this.endpoint, data, { headers: this.headers })
            .then(function (response) {
                let output = response.data.flagValue
                output = (output === 'Disabled') ? false : output
                output = (output === 'Enabled') ? true : output
                return output
            })
            this.lastValue = output
            return output
        } catch (error) {
            console.log(error)
            return defaultValue
        }   
    }
}

module.exports = ScannerDarklyClient

