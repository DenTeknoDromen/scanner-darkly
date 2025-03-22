const { loadYamlFlags, getFlag } = require('../load-flags')

const testFlags = [
    { name: 'testNameA' },
    { name: 'testNameB' },
    { name: 'testNameC' },
]

test('It should load a yaml file with the correct structure as an object', () => {
    const FLAGS = loadYamlFlags()
    expect(typeof FLAGS).toEqual('object')
    expect(typeof FLAGS[0]).toEqual('object')
    expect(typeof FLAGS[0].name).toEqual('string')
    expect(typeof FLAGS[0].mainToggleValue).toEqual('string')
    expect(typeof FLAGS[0].rules).toEqual('object')
})

test('It should return array index of an object based on name', () => {
    expect(getFlag('testNameA', testFlags)).toEqual(0)
    expect(getFlag('testNameB', testFlags)).toEqual(1)
    expect(getFlag('testNameC', testFlags)).toEqual(2)
    expect(getFlag('testNameD', testFlags)).toEqual('No such flagname')
})

test('It should handle invalid values', () => {
    expect(getFlag(null, testFlags)).toEqual('No such flagname')
    expect(getFlag('testNameA', null)).toEqual('Invalid values')
})