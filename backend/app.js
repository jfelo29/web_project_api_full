const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const signin = require('./controllers/signin');
const users = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const PORT = 3001;
app.use(cors());
app.options('*', cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/aroundbfelipe2').then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});
app.use('/auth', auth.auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use(requestLogger);
app.use('/signin', signin.signin);
app.use('/signup', users.createUser);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.use(errorLogger);
app.use(errors());
app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
