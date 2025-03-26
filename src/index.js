const express = require('express')
const { loadYamlFlags, updateYamlFlags } = require('./load-flags')
const { applyRules } = require('./apply-rules')

const app = express()
const port = 4000

const FLAGS = loadYamlFlags()
app.use(express.json())

app.get('/test', (req, res) => {
  res.send('The server is running!')
})

// Returns flagvalue to client
app.post('/flags', (req, res) => {
  try {
    const { context } = req.body
    
    const currFlag = FLAGS.find((element) => element.name === context.flagname)
    const flagOutcome = applyRules(context, currFlag)

    console.log(`Retrieving value for ${context.flagname}`)
    res.status(200).send({flagValue: flagOutcome})

  } catch (error){
    console.log(error)
    res.status(500).send('server error')
  }
})

// Get Flag rules
app.get('/flagrules', (req, res) => {
  try { 
    console.log('Retrieving flagrules')
    res.status(200).send(FLAGS)
  } catch (error){
    res.status(500).send('server error')
  }
})

// Set Flag rules
app.post('/flagrules', (req, res) => {
  try {
    const { name, key, value } = req.body

    const currFlag = FLAGS.find((element) => element.name === name)

    if (key === 'mainToggleValue') {
      currFlag[key] = value
    } else {
      const keys = key.split('.')
      currFlag[keys[0]][keys[1]][keys[2]] = value
    }
    
    updateYamlFlags(FLAGS)

    console.log("Updated flagrules")
    res.status(200).send()
  } catch (error){
    res.status(500).send('server error')
  }
})

// Webhook??

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

