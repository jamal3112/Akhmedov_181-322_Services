const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const open = require('open')
const postRoute = require('./routes/postRoute')
const Post = require('./models/postModel')

const app = express()

const dbURI = 'mongodb+srv://hamlet:CYEv6TI4o9UzPlRA@blog.iqpyp.mongodb.net/blog?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => app.listen(3000))
  .catch((error) => console.log(error.message))

app.set('view engine', 'ejs')

app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/posts', postRoute)

app.get('/', (_, res) => {
  res.redirect('/posts')
})

app.get('/about', (_, res) => {
  res.render('about', { title: 'About', style: null })
})

app.get('/create', (_, res) => {
  res.render('create', { title: 'Create a post', style: 'form' })
})

app.get('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id
    const post = await Post.findById(id)
    res.render('edit', { title: 'Edit a post', style: 'form', post })
  } catch (error) {
    res.status(404).render('404', { title: '404', style: '404' })
    console.log(error.message)
  }
})

app.use((_, res) => {
  res.status(404).render('404', { title: '404', style: '404' })
})

setTimeout(async () => {
  await open('http://localhost:3000/')
}, 1000)