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
    res.status(400).json({ error: "Please provide a name for the zoo" })
  } else {
    db("zoos")
      .insert({ name: name })
      .then(ids => {
        res.status(201).json(ids[0])
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the zoo to the database"
        })
      })
  }
})

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The zoos information could not be retrieved." })
    })
})

server.get("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: Number(req.params.id) })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo)
      } else {
        res
          .status(404)
          .json({ message: "The zoo with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The zoo information could not be retrieved." })
    })
})

server.delete("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: Number(req.params.id) })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count)
      } else {
        res
          .status(404)
          .json({ message: "The zoo with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The zoo could not be removed" })
    })
})

const port = 3300
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
