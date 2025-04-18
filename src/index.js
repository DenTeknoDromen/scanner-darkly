const express = require('express')
const { loadYamlFlags } = require('./load-flags')
const { applyRules } = require('./apply-rules')
const { setFlags } = require('./set-flags')

const app = express()
const port = 4000

const FLAGS = loadYamlFlags()
app.use(express.json())

app.get('/test', (req, res) => {
  res.send('The server is running!')
})

// Returns flagvalue to client
app.post('/flags', async (req, res) => {
  try {
    const { body } = req
    
    const currFlag = body.flagname
    const flagOutcome = await applyRules(body, FLAGS[currFlag])

    console.log(`Retrieving value for ${body.flagname}`)
    res.status(200).send({flagValue: flagOutcome})

  } catch (error){
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// Get Flag rules
app.get('/flagrules', async (req, res) => {
  try { 
    console.log('Retrieving flagrules')
    res.status(200).send(FLAGS)
  } catch (error){
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// Set Flag rules
app.post('/flagrules', async (req, res) => {
  try {
    const { body } = req

    await setFlags(FLAGS, body)

    console.log("Updated flagrules")
    res.status(200).send()
  } catch (error){
    console.log(error.message)
    res.status(500).send('server error')
  }
})

// Webhook??

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

