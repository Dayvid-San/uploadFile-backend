// Para que o node leia as variaveis do .env
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const path = require('path')


// Darabase setup
mongoose.connect(
    process.env.MONGO_URL, 
    {
    useNewUrlParser: true,
    }
)


app.use(express.json())  // assim o express consegue lidar com o Json
app.use(express.urlencoded({ extended: true })) // assim conseguir lidar com requisições no padrão url
app.use(morgan('dev'))
app.use('/files', express.static(
    path.resolve(__dirname, '..' , 'tmp', 'upload')
    ))

app.use(require('./routes'))


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Está rodando na porta ${PORT}`)
})