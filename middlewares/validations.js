const isValidToken = (request, response, next) => {
  const { authorization } = request.headers;
    if (!authorization) {
      return response.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization !== '7mqaVRXJSp886CGr') {
      return response.status(401).json({ message: 'Token inválido' });
    }

    next();
  };

const isValidName = (request, response, next) => {
    const { name } = request.body;

    if (!name || name === '') {
return response.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return response.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  };

  const isValidAge = (request, response, next) => {
const { age } = request.body;

if (!age || age === '') {
    return response.status(400).json({ message: 'O campo "age" é obrigatório' });
}

if (/* parseInt(age, 10) */age < 18) {
    return response.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
}
next();
  };
  
  const isValidWatched = (request, response, next) => {
    const { talk } = request.body;
    // Regex em https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy
      const date = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
    
    if (!date.test(talk.watchedAt)) {
      return response.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
      }
      
      next();
    };
    
    const isValidRate = (request, response, next) => {
      const { talk } = request.body;
      
  if (/* parseInt(talk.rate, 10) */ talk.rate < 1 || /* parseInt(talk.rate, 10) */ talk.rate > 5) {
        return response.status(400).json({
          message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
        }
        
        next();
      };
      
      const isValidTalk = (request, response, next) => {
        const { talk } = request.body;
      
        if (!talk || !talk.watchedAt || !talk.rate) {
          return response.status(400)
          .json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
        }
      
        next();
      };

      module.exports = {
        isValidToken,
        isValidName,
        isValidAge,
        isValidWatched,
        isValidRate,
        isValidTalk,
      };