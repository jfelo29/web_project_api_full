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
    return next(new Error('Error de autorización'));
  } catch (error) {
    const err = new Error('Se requiere autorización');
    err.statusCode = 500;
    return next(err);
  }
};

