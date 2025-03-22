const { checkMatch, applyRules } = require('../apply-rules')

const testRulesValue = {
    toggleValue: 'testToggleValue',
    value: 'a'
}

const testContext = {
    "rule1": "a",
    "rule2": "a",
    "rule3": "a",
}

const testFlag = {
    name: 'testName',
    mainToggleValue: 'Disabled',
    rules: {
        rule1: {
            ...testRulesValue
        },
        rule2: {
            ...testRulesValue
        },
        rule3: {
            ...testRulesValue     
        }
    }
}

console.log(testFlag)

test('It should return toggle value when it finds a matching value', () => {
    expect(checkMatch('a', testRulesValue, 'mainToggleValue')).toEqual('testToggleValue')
    testRulesValue.value = ['a', 'b']
    expect(checkMatch('b', testRulesValue, 'mainToggleValue')).toEqual('testToggleValue')
})

test('It should return the mainToggleValue when no match is found', () => {
    expect(checkMatch('c', testRulesValue, 'mainToggleValue')).toEqual('mainToggleValue')
})

test('It should handle invalid values', () => {
    expect(checkMatch(null, testRulesValue, 'mainToggleValue')).toEqual('mainToggleValue')
    expect(checkMatch('a', null, 'mainToggleValue')).toEqual('mainToggleValue')
    expect(checkMatch('c', testRulesValue, null)).toEqual(null)
})

test('It should return "Disabled" if maintogglevalue if disabled', () => {
    testFlag.mainToggleValue = 'Disabled'
    expect(applyRules(testContext, testFlag)).toEqual('Disabled')
})

test('It should return the first rule being matched', () => {
    testFlag.mainToggleValue = 'Enabled'
    testFlag.rules.rule1.toggleValue = 'testToggleValue1'
    expect(applyRules(testContext, testFlag)).toEqual('testToggleValue1')
})

test('It should return the second rule being matched', () => {
    testFlag.mainToggleValue = 'Enabled'
    testFlag.rules.rule2.toggleValue = 'testToggleValue2'
    testContext.rule1 = 'b'
    expect(applyRules(testContext, testFlag)).toEqual('testToggleValue2')
})

test('It should return the third rule being matched', () => {
    testFlag.mainToggleValue = 'Enabled'
    testFlag.rules.rule3.toggleValue = 'testToggleValue3'
    testContext.rule2 = 'b'
    expect(applyRules(testContext, testFlag)).toEqual('testToggleValue3')
})

test('It should return the mainToggleValue if none of the rules match', () => {
    testFlag.mainToggleValue = 'Enabled'
    testContext.rule3 = 'b'
    expect(applyRules(testContext, testFlag)).toEqual('Enabled')
    expect(applyRules(null, testFlag)).toEqual('Enabled')
})