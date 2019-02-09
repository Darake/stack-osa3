const express = require('express')
const app = express()

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
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) res.json(person)
  else res.status(404).end()
})

app.get('/info', (req, res) => {
  date = new Date()
  amount = persons.length
  res.send(`Puhelinluettelossa ${amount} henkilön tiedot </br> ${date}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('Server running on port ', PORT)
})