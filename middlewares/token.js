// const token = (request, response) => {
//     const { authorization } = request.headers;
//   if (!authorization) {
//     return response.status(401).json({ message: 'Token não encontrado' });
//   }
//   if (authorization !== '7mqaVRXJSp886CGr') {
//     return response.status(401).json({ message: 'Token inválido' });
//   }
// };

const token = (request, response, next) => {
  const tokens = request.headers.authorization;
  if (!tokens) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (tokens.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = token;