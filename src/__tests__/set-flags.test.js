const { setFlags } = require('../set-flags')

const mockFlags = {
    mainToggleValue: 'Enabled',
    rules: {
        tenant: {
            toggleValue: 'Enabled'
        },
        workstation: {
            toggleValue: 'Enabled'
        }
    }
}

// const mockInput = {
//     name: 'testFlag',
//     mainToggleValue: 'Disabled',

// }
const mockInput = {
    name: 'testFlag',
    key: 'mainToggleValue',
    value: 'Disabled'
}

test('It should set the main toggle value if provided', () => {
    setFlags(mockInput, mockFlags)
    expect(mockFlags.mainToggleValue).toEqual('Disabled')
})