const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'secret-key' } = process.env;

module.exports.auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization.startswith('Bearer ')) {
    return res.status(401).send({ message: 'No autorizado' });
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).send({ message: 'No autorizado' });
  }
};

