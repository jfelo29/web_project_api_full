const router = require('express').Router();
// const fs = require('fs');
// const path = require('path');
const { getAllCards, createCard, deleteCard, deleteCardLikes, likeCard, getCardById } = require('../controllers/cards');
const auth = require('../middlewares/auth');


router.get('/cards', getAllCards);
router.get('/cards/:cardId', getCardById);
router.post('/cards', auth.auth, createCard);
router.delete('/cards/:cardId',auth.auth, deleteCard);
router.put('/cards/:cardId/likes',auth.auth, likeCard);
router.delete('/cards/:cardId/likes', auth.auth, deleteCardLikes);


module.exports = router;





