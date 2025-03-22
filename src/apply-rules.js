//const { loadYamlFlags } = require('../load-flags')
//const flags = loadYamlFlags()

function checkMatch(contextValue, rulesValue, mainToggleValue) {
    try {
        const { value, toggleValue} = rulesValue

        if (typeof value === 'object' && value.includes(contextValue)) {
            return toggleValue
        } else if (contextValue === value) {
            return toggleValue
        } else {
            return mainToggleValue
        }
    } catch (error) {
        return mainToggleValue
    }
}

function applyRules(context, flag) {
    if (flag.mainToggleValue == 'Disabled') {
        return flag.mainToggleValue
    }
    let returnValue = flag.mainToggleValue
    for (const category in flag.rules) {
        for (const ids in context) {
            if (category == ids) {
                returnValue = checkMatch(
                    context[ids], 
                    flag.rules[category], 
                    flag.mainToggleValue
                )
            }
        }
        if (returnValue != flag.mainToggleValue) {
            break
        }
    }
    return returnValue
}

module.exports = {
    checkMatch,
    applyRules,
}


// console.log(applyRules(testContext, flags[0].rules, flags[0].mainToggleValue))