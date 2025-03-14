const User = require('../models/users');


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener usuarios' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    if (!user === 'usuario no encontrado') {
      // console.log(error);
      return res.status(404).send({ message: 'usuario no encontrado' });
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ message: 'Error al obtener el usuario' });
  }
};




module.exports = { getAllUsers, getUserById };

