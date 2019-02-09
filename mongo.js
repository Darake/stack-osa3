const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://full:${password}@stack-vk4ai.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(response => {
        console.log(`lisätään ${process.argv[3]} numero ${process.argv[4]} luetteloon`)
        mongoose.connection.close();
    })
}

if (process.argv.length === 3) {
    Person
        .find({})
        .then(result => {
            console.log('puhelinluettelo')
            result.forEach(persons => {
                console.log(persons.name, persons.number)
            })
            mongoose.connection.close();
        })
}

