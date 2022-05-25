const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')

// carregando modulos
const Post = require('./models/Post')

routes.get('/posts', async (req, res) => {
    const posts = await Post.find({  })

    return res.json(posts)
})

// Usando o multer como um middiware
// O single faz um upload de arquivo por vez
routes.post('/posts', multer().single('file'), (req,res) => {

    const { originalname: name, size, key, location:  url = '' } = req.file

    const post = await Post.create({
        name,
        size ,
        key ,
        url
    })
    
    return res.json({
        hello: 'dayvid '
    })
})

routes.delete('/posts/:id', async (req,res) => {
    const post = await Post.findById(req.params.id)

    await post.remove()

    return res.send()
})


module.exports = routes