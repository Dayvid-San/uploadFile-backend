const express = require('express')
const app = express()


app.use(require('./routes'))


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Está rodando na porta ${PORT}`)
})