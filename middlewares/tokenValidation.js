// const tokenValidation = (request, response, next) => {
//     const { authorization } = request.headers;
//   if (!authorization) {
//     response.status(401).json({ message: 'Token não encontrado' });
//   }
//   if (authorization !== '7mqaVRXJSp886CGr') {
//     return response.status(401).json({ message: 'Token inválido' });
//   }
//   next();
// };

const token = (request, response, next) => {
  const tokens = request.headers.Authorization;
  if (!tokens) {
    return response.status(401).json({ message: 'Token não encontrado' });
  }
  if (tokens.length !== 16) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = token;