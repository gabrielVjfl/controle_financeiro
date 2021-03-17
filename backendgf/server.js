const port = 8040

const express = require('express')

const app = express()

const cors = require('cors')

const mongoose = require('mongoose')

const Entradas = require('./models/Entradas')
const Saidas = require('./models/Saidas')
const Users = require('./models/Users')

const Settings = require('./config/SettingsMongoose')

const route = require('./routes/route')

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api', route)

mongoose.Promise = global.Promise

mongoose.connect(`${Settings.database}`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(suc => {
    console.log('Conectado!')
}).catch(err => {
    console.log('Ops deu erro!')
})

app.get('/ok', (req,res) => {
    res.send('ok')
})

app.listen(port, () => {
    console.log('listening on port', port)
})




