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

router.get("/", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The bears information could not be retrieved." })
    })
})

router.get("/:id", (req, res) => {
  db("bears")
    .where({ id: Number(req.params.id) })
    .first()
    .then(bear => {
      if (bear) {
        res.status(200).json(bear)
      } else {
        res
          .status(404)
          .json({ message: "The bear with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The bear information could not be retrieved." })
    })
})

router.delete("/:id", (req, res) => {
  db("bears")
    .where({ id: Number(req.params.id) })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count)
      } else {
        res
          .status(404)
          .json({ message: "The bear with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The bear could not be removed" })
    })
})

router.put("/:id", (req, res) => {
  const name = req.body.name
  if (!name) {
    res.status(400).json({ error: "Please provide a name for the bear" })
  } else {
    db("bears")
      .where({ id: Number(req.params.id) })
      .update({ name: name })
      .then(count => {
        if (count > 0) res.status(201).json(count)
        else
          res
            .status(404)
            .json({ message: "The bear with the specified ID does not exist." })
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while updating the bear to the database"
        })
      })
  }
})

module.exports = router
