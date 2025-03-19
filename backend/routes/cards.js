const router = require('express').Router();
// const fs = require('fs');
// const path = require('path');
const { getAllCards, createCard, deleteCard, deleteCardLikes, likeCard, getCardById } = require('../controllers/cards');

router.get('/cards', getAllCards);
router.get('/cards/:cardId', getCardById);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', deleteCardLikes);


module.exports = router;





