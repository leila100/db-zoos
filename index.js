const express = require("express")
const helmet = require("helmet")
const knex = require("knex")
const knexConfig = require("./knexfile")
const db = knex(knexConfig.development)

const server = express()

server.use(express.json())
server.use(helmet())

server.post("/api/zoos", (req, res) => {
  const name = req.body.name
  if (!name) {
    res.status(400).json({ error: "Please give a name to the zoo" })
  } else {
    db("zoos")
      .insert({ name: name })
      .then(ids => {
        res.status(201).json(ids[0])
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
})

const port = 3300
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
