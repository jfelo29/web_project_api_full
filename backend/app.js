const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const signin = require('./controllers/signin');
const users = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
const PORT = 3001;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb').then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});
app.use('/auth', auth.auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/singin', signin.signin);
app.use('/signup', users.createUser);

app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

