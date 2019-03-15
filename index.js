const express = require("express")
const helmet = require("helmet")
const knex = require("knex")
const knexConfig = require("./knexfile")

const server = express()

server.use(express.json())
server.use(helmet())

const db = knex(knexConfig.development)

// endpoints here

const port = 3300
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
