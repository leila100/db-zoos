const express = require("express")
const knex = require("knex")
const knexConfig = require("../knexfile")

const router = express.Router()
const db = knex(knexConfig.development)

router.post("/", (req, res) => {
  const name = req.body.name
  if (!name) {
    res.status(400).json({ error: "Please provide a name for the bear" })
  } else {
    db("bears")
      .insert({ name: name })
      .then(ids => {
        res.status(201).json(ids[0])
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the bear to the database"
        })
      })
  }
})

module.exports = router
