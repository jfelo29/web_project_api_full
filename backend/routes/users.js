
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getAllUsers, getUserById, createUser } = require('../controllers/users');
const User = require('../models/users');
const auth = require('../middlewares/auth');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}
router.get('/users', getAllUsers);

router.get('/users/:id', getUserById);

router.post('/users', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
    avatar: Joi.string().required().custom(validateURL),
  }),
}), createUser);
router.patch('/users/me', async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    user.name = name;
    user.about = about;
    user.avatar = avatar;

    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: 'Error al actualizar el perfil' });
  }
});

router.patch('/users/me/avatar', async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    user.avatar = avatar;
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: 'Error al actualizar el avatar' });
  }
});
router.get('/users/me', auth.auth, getUserById);


module.exports = router;


