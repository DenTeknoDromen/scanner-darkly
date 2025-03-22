const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const rulesPath = path.join(__dirname, '../rules/flags.yaml')

function loadYamlFlags() {
    const fileContents = fs.readFileSync(rulesPath, 'utf-8');
    return yaml.load(fileContents);    
}

function getFlag(flagName, FLAGS) {
    try {
        let index = 0
        for (flags of FLAGS) {
            if (flags.name === flagName) {
                return index
            }
            index += 1
        }
        return 'No such flagname'        
    } catch (error) {
        return 'Invalid values'
    }

}

module.exports = {
    loadYamlFlags,
    getFlag
}