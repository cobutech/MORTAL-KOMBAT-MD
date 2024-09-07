const translatte = require('translatte');

async function translateText(text) {
  try {
    const result = await translatte(text, { to: 'en' });
    console.log(result.text);
  } catch (error) {
    console.error(error);
  }
}

translateText("Your text here");
