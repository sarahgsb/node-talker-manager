const express = require('express');
// const bodyParser = require('body-parser');
const fs = require('fs');

const crypto = require('crypto');
const login = require('./middlewares/login');
// const tokenValidation = require('./middlewares/tokenValidation');
const {
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatched,
  isValidRate } = require('./middlewares/validations');

const talkers = './talker.json';

const app = express();
app.use(express.json());

// app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const NOT_FOUND = 404;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1 - Crie o endpoint GET /talker
app.get('/talker', (_request, response) => {
  const talkerList = fs.readFileSync(talkers, 'utf-8');
  return response.status(HTTP_OK_STATUS).json(JSON.parse(talkerList));
});

// Requisito 2 - Crie o endpoint GET /talker/:id
app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  
  const talkerList = fs.readFileSync(talkers, 'utf-8');
  
  const talker = JSON.parse(talkerList).find((el) => el.id === parseInt(id, 10));
  
  if (!talker) {
      return response.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  
  return response.status(HTTP_OK_STATUS).json(talker);
  });

// Requisito 3 - Crie o endpoint POST /login
// Referencia de como usar o modulo crypto em https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
app.post('/login', login, (_request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  return response.status(HTTP_OK_STATUS).json({ token });
});    

// Requisito 4 - Crie o endpoint POST /talker
app.post('/talker',
// tokenValidation,
isValidToken,
isValidName,
isValidAge,
isValidTalk,
isValidWatched,
isValidRate,
(request, response) => {
  const { name, age, talk: { watchedAt, rate } } = request.body;

  const talkersList = JSON.parse(fs.readFileSync(talkers, 'utf-8'));

  const createTalker = {
    name,
    age,
    id: talkersList.length + 1,
    talk: { watchedAt, rate },
  };

  talkersList.push(createTalker);
  fs.writeFileSync(talkers, JSON.stringify(talkersList));

  return response.status(201).json(createTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
