const Card = require('../models/cards');

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener las tarjetas' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link, owner, likes, createdAt } = req.body;
    const card = new Card({ name, link, owner, likes, createdAt });
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    return res.status(400).send({ message: 'Error al crear la tarjeta', error });
  }
};

const deleteCard = async (req, res) => {
  try {
    // const deleteCard = await Card.findByIdAndDelete(req.params.cardId);
    const deleteCard = await Card.findByIdAndDelete(req.params.cardId).orFail(() => res.status(400).send({ message: 'tarjeta eliminada' })).then((card) => res.status(200).send({ message: 'tarjeta eliminada', card }));
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Error al eliminar la tarjeta' });
  }
};

/* const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId, {
      isCreated: false,
    }, { new: true }).orFail();


    return res.status(200).send({ message: 'tarjeta eliminada', card });
  } catch (error) {
    return res.status(500).send({ message: 'Error al al eliminar el tarjeta' });
  }
};
*/

/* const deleteCard = async (req, res) => {
    try {
      const card = await Card.findById(req.params.cardId).orFail();

      await card.remove();
      return res.status(204).send({ message: 'Tarjeta eliminada' });
    } catch (error) {
      return res.status(500).send({ message: 'Error al eliminar la tarjeta' });
    }
  }; */

const likeCard = async (req, res) => {
  try {
    console.log(req.params.cardId);
    const userId = req.user._id;
    const cardLike = await Card.findByIdAndUpdate(
      req.params.cardId,

      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail();

    if (cardLike.likes.includes(req.user._id)) {
      return res.status(200).send({ message: 'like ya existe', cardLike });
    }


    // return res.status(204).send({ message: 'like agregado', card });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'error al querer poner like' });
  }
};


const deleteCardLikes = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();


    return res.status(200).send({ message: 'like eliminado', card });
  } catch (error) {
    return res.status(500).send({ message: 'Error al al eliminar el like' });
  }
};




module.exports = { getAllCards, createCard, deleteCard, deleteCardLikes, likeCard };
