const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const rawHeader = req.header('Authorization') || '';
  const token = rawHeader.replace('Bearer ', '').trim();

  if (!token || token === 'undefined' || token === 'null') {
    return res.status(401).json({
      success: false,
      error: { message: 'No token provided', code: 'NO_TOKEN' }
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = { id: decoded.id }   // make sure login sends same field

    next()

  } catch (error) {
    console.error("Auth middleware error:", error.message)   // ⭐ FIX HERE

    return res.status(401).json({
      success: false,
      error: { message: 'Invalid token', code: 'INVALID_TOKEN' }
    })
  }
}

module.exports = authMiddleware