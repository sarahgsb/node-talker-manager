const BAD_REQUEST = 400;

// Referencia para o regex de validação de email em https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
const emailValidation = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

const login = (request, response, next) => {
  const { email, password } = request.body;
  if (!email) {
    return response.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailValidation(email)) {
    return response
    .status(BAD_REQUEST).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response
      .status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response
      .status(BAD_REQUEST)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = login;
