const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/auth');

const app = express();
const PORT = 3000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb').then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});
app.use((req, res, next) => {
  req.user = {
    _id: '67983a184b9b71856c998a47', // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
});
app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

app.get('/', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

