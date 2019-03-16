const express = require("express")
const knex = require("knex")
const knexConfig = require("../knexfile")

const db = knex(knexConfig.development)
const router = express.Router()

router.post("/", (req, res) => {
  const { name } = req.body
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

router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400).json({ error: "Please provide a name for the zoo" })
  } else {
    db("zoos")
      .where({ id: Number(req.params.id) })
      .update({ name: name })
      .then(count => {
        if (count > 0) res.status(200).json(count)
        else
          res
            .status(404)
            .json({ message: "The zoo with the specified ID does not exist." })
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while updating the zoo to the database"
        })
      })
  }
})

module.exports = router
