require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('postbody', function (req, res) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postbody'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '045-1236543'
  },
  {
    id: 2,
    name: 'Arto Järvinen',
    number: '041-21423123'
  },
  {
    id: 3,
    name: 'Lea Kutvonen',
    number: '040-4323234'
  },
  {
    id: 4,
    name: 'Martti Tienari',
    number: '09-784232'
  }
]

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(people => {
      res.json(people.map(person => person.toJSON()))
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({error: 'name or number missing'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => res.json(savedPerson.toJSON()))
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) res.json(person)
  else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/info', (req, res) => {
  date = new Date()
  amount = persons.length
  res.send(`Puhelinluettelossa ${amount} henkilön tiedot </br> ${date}`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log('Server running on port ', PORT)
})