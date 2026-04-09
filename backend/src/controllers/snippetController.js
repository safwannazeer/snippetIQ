const Snippet = require('../models/Snippet')

// Get all snippets for the authenticated user
const getAllSnippets = async (req, res, next) => {
  try {
    const snippets = await Snippet.find({ user: req.user.id })
    res.json({ success: true, data: snippets })
  } catch (error) {
    next(error)
  }
}

// Get snippet by ID
const getSnippetById = async (req, res, next) => {
  try {
    const snippet = await Snippet.findOne({ _id: req.params.id, user: req.user.id })
    if (!snippet) {
      return res.status(404).json({ success: false, error: { message: 'Snippet not found', code: 'SNIPPET_NOT_FOUND' } })
    }
    res.json({ success: true, data: snippet })
  } catch (error) {
    next(error)
  }
}

// Create new snippet
const createSnippet = async (req, res, next) => {
  try {
    const { title, code, language, tags, description } = req.body
    const snippet = await Snippet.create({
      title,
      code,
      language,
      tags,
      description,
      user: req.user.id
    })
    res.status(201).json({ success: true, data: snippet })
  } catch (error) {
    next(error)
  }
}

// Update snippet
const updateSnippet = async (req, res, next) => {
  try {
    const { title, code, language, tags, description } = req.body
    const snippet = await Snippet.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, code, language, tags, description },
      { new: true, runValidators: true }
    )
    if (!snippet) {
      return res.status(404).json({ success: false, error: { message: 'Snippet not found', code: 'SNIPPET_NOT_FOUND' } })
    }
    res.json({ success: true, data: snippet })
  } catch (error) {
    next(error)
  }
}

// Delete snippet
const deleteSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    if (!snippet) {
      return res.status(404).json({ success: false, error: { message: 'Snippet not found', code: 'SNIPPET_NOT_FOUND' } })
    }
    res.json({ success: true, message: 'Snippet deleted successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet
}
