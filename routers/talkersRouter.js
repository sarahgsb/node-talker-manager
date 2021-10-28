const router = require('express').Router();
const fs = require('fs');

const talkers = './talker.json';

const HTTP_OK_STATUS = 200;

// Requisito 1 - Crie o endpoint GET /talker
router.get('/', (_request, response) => {
  const talkerList = fs.readFileSync(talkers, 'utf-8');
  return response.status(HTTP_OK_STATUS).json(JSON.parse(talkerList));
});

module.exports = router;
