function setFlags(toggle, FLAGS) {
    console.log(toggle)

    FLAGS[toggle.key] = toggle.value

    // if (toggle.keys() === 'mainToggleValue') {
    //     FLAGS.mainTogglValue = toogle
    // }
}

module.exports = {
    setFlags
}