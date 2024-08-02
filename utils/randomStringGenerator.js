const generateRandomString = async (length) => {
  const letter = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890-_=+|";
  let string = '';
  for (let i = 0; i < length; i++) {
     string += letter[Math.floor(Math.random() * letter.length)];
  }

  return await string;
}

module.exports = generateRandomString