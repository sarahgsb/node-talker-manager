const router = require('express').Router();
const fs = require('fs');

const talkers = './talker.json';

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;

// Requisito 1 - Crie o endpoint GET /talker
router.get('/', (_request, response) => {
  const talkerList = fs.readFileSync(talkers, 'utf-8');
  return response.status(HTTP_OK_STATUS).json(JSON.parse(talkerList));
});

// Requisito 2 - Crie o endpoint GET /talker/:id
router.get('/:id', (request, response) => {
    const { id } = request.params;
    
    const talkerList = fs.readFileSync(talkers, 'utf-8');
    
    const talker = JSON.parse(talkerList).find((el) => el.id === parseInt(id, 10));
    
    if (!talker) {
        return response.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }
    
    return response.status(HTTP_OK_STATUS).json(talker);
    });

module.exports = router;
