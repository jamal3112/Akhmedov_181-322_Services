const Post = require('../models/postModel')

const post_index = async (_, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 })
    res.render('index', { title: 'Blogs', style: 'index', posts })
  } catch (error) {
    res.render('index', { title: 'Blogs', style: 'index', posts: [] })
    console.log(error)
  }
}

const post_detail = async (req, res) => {
  try {
    const id = req.params.id
    const post = await Post.findById(id)
    res.render('detail', { title: post.title, style: 'detail', post })
  } catch (error) {
    res.status(404).render('404', { title: '404', style: '404' })
    console.log(error)
  }
}

const post_create = async (req, res) => {
  try {
    const post = new Post(req.body)
    await post.save()
    res.redirect('/')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const post_delete = async (req, res) => {
  try {
    const id = req.params.id
    await Post.findByIdAndDelete(id)
    res.json({ redirect: '/' })
  } catch (error) {
    console.log(error.message)
  }
}

const post_edit = async (req, res) => {
  try {
    const id = req.params.id
    await Post.findByIdAndUpdate(id, req.body)
    res.json({ redirect: `/posts/${id}` })
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  post_index,
  post_detail,
  post_create,
  post_delete,
  post_edit
}