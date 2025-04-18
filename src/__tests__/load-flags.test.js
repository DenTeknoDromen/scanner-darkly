const { loadYamlFlags, getFlag } = require('../load-flags')

const testFlags = [
    { name: 'testNameA' },
    { name: 'testNameB' },
    { name: 'testNameC' },
]

test('It should load a yaml file with the correct structure as an object', () => {
    const FLAGS = loadYamlFlags()
    expect(typeof FLAGS).toEqual('object')
    expect(typeof FLAGS.name).toEqual('string')
    expect(typeof FLAGS.mainToggleValue).toEqual('string')
    expect(typeof FLAGS.rules).toEqual('object')
})

test('It should handle invalid values', () => {
    expect(getFlag(null, testFlags)).toEqual('No such flagname')
    expect(getFlag('testNameA', null)).toEqual('Invalid values')
})