const mongoose = require('mongoose');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    defaut: 'Explorador',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator(value) {
        return urlRegex.test(value);
      },
      message:
        '⚠️ La URL del avatar no es válida. Asegúrate de que comience con http:// o https://',
    },
  },

  email: {
    type: String,
    requiered: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'email invalido',
    },

  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    select: false,

  },
});
const User = mongoose.model('user', usersSchema);
module.exports = User;

