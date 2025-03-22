const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const rulesPath = path.join(__dirname, '../rules/flags.yaml')

function loadYamlFlags() {
    const fileContents = fs.readFileSync(rulesPath, 'utf-8');
    return yaml.load(fileContents);    
}

function getFlag(flagName, FLAGS) {
    for (flags of FLAGS) {
        if (flags.name === flagName) {
            return flags
        }        
    }
    return 'No such flagname'
}

// console.log(getFlag('testFlag2', loadYamlFlags()))

module.exports = {
    loadYamlFlags,
    getFlag
}