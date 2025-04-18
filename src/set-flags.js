const { updateYamlFlags } = require('./load-flags')

async function setFlags(FLAGS, newFlags) {
    for (keys of Object.keys(newFlags)) {
        FLAGS[keys] = {...FLAGS[keys], ...newFlags[keys]}
    }
    FLAGS = {...FLAGS, ...newFlags}
    updateYamlFlags(FLAGS)
}

module.exports = {
    setFlags
}