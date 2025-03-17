const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// const signin = require('./controllers/signin');
// const users = require('./routes/users');

const app = express();
const PORT = 3000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb').then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

app.use('/', usersRouter);
app.use('/', cardsRouter);
// app.use('/singin', signin);
// app.use('/signup', users.createUser);
app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
/* comente linea 6, 7, 21 y 22 para desactivar porque me
arrojaba error  Router.use() requires a middleware function but got a undefined
una vez las comento, se soluciona el errror, pero igual necesito esas lineas para crear las rutas
que pide el proyecto

no logro poder intalar en signin const jwt = require('jsonwebtoken'); elimine node y se volvio
a intaar y no fuinciono y tambien el package.json
*/

