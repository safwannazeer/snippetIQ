const express = require('express')
const authmiddleware = require('../middleware/auth.js')

const { getAllSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet } = require('../controllers/snippetController')

const router = express.Router()
router.get("/test", authmiddleware, (req, res) => {
  res.json({ message: "Protected route working", user: req.user });
});
router.use(authmiddleware)
router.get('/', getAllSnippets)
router.get('/:id', getSnippetById)
router.post('/', createSnippet)
router.put('/:id', updateSnippet)
router.delete('/:id', deleteSnippet)


module.exports = router