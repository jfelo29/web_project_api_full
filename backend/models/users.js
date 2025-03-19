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
    default: 'enlace',
    /* validate: {
      alidator: function (v) {
        return /^(https?:\/\/(?:www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]+#?)$/.test(v);
      },
      message: props => `${props.value} no es un enlace válido!`
    } */

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
}
);
const User = mongoose.model('user', usersSchema);
module.exports = User;

