const Card = require('../models/cards');

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener las tarjetas' });
  }
};
const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId)
      .populate('owner')
      .orFail(new error('tarjeta no encontrada'));
    res.json(card);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarjeta' });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = new Card({ name, link, owner: req.user._id });
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    return res.status(400).send({ message: 'Error al crear la tarjeta', error });
  }
};

const deleteCard = async (req, res) => {
  console.log("🚀 ~ deleteCard ~ req.params.cardId:", req.params.cardId);
  await Card.findById(req.params.cardId)
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return res.status(403).send({ message: 'No autorizado' });
      }
      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then(() => {
      res.status(200).send({ message: 'tarjeta eliminada' });
    });
};
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
module.exports = { getAllCards, createCard, deleteCard, deleteCardLikes, likeCard, getCardById };
