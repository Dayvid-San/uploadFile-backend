const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

// carregando modulos
const Post = require('./models/Post')


// Usando o multer como um middiware
// O single faz um upload de arquivo por vez
routes.post('/post', multer().single('file'), (req,res) => {

    const { originalname: name, size, filename: key} = req.file

    const post = await Post.create({
        name,
        size ,
        key ,
        url: '',
    })
    
    return res.json({
        hello: 'dayvid '
    })
})


module.exports = routes