const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')


// Darabase setup
mongoose.connect(
    'mongodb://localhost:27017/upload', 
    {
    useNewUrlParser: true,
    }
)


app.use(express.json())  // assim o express consegue lidar com o Json
app.use(express.urlencoded({ extended: true })) // assim conseguir lidar com requisições no padrão url
app.use(morgan('dev'))

app.use(require('./routes'))


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Está rodando na porta ${PORT}`)
})