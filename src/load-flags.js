const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const rulesPath = path.join(__dirname, '../rules/flags.yaml')

function loadYamlFlags() {
    const fileContents = fs.readFileSync(rulesPath, 'utf-8');
    return yaml.load(fileContents);    
}

async function updateYamlFlags(FLAGS) {
    try {
        const yamlString = yaml.dump(FLAGS)
        fs.writeFileSync(rulesPath, yamlString)
    } catch (error) {
        console.log('Could not write to file')
    }

}

module.exports = {
    loadYamlFlags,
    updateYamlFlags
}