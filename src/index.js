const express = require('express')
const { loadYamlFlags, getFlag } = require('./load-flags')
const { applyRules } = require('./apply-rules')

const app = express()
const port = 3000

const FLAGS = loadYamlFlags()
app.use(express.json())

app.get('/test', (req, res) => {
  res.send('The server is running!')
})

// Returns flagvalue to client
app.post('/flags', (req, res) => {
  try {
    const { context } = req.body
    console.log("Payload recieved")

    const flagIndex = getFlag(context.flagname, FLAGS)
    const flagOutcome = applyRules(context, FLAGS[flagIndex])
    
    res.status(200).send({flagValue: flagOutcome})

  } catch (error){
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

    const flagIndex = getFlag(name, FLAGS)
    FLAGS[flagIndex][key] = value

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

