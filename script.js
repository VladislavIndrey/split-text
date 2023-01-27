function splitText(text) {
  const maxSize = 140;
  if (text.length <= maxSize) {
    console.log(text);
    return text;
  }

  let a = Math.ceil(text.length / maxSize);
  const chunkSize = +(maxSize - ` ${a}/${a}`.length);
  const regex = new RegExp(`.{1,${chunkSize}}\\b`, "g");
  const chunks = text.match(regex);
  const chunksLength = chunks.length;
  if (chunksLength > 9999) {
    throw new Error(`Text is too long, chunks length is ${chunksLength}`);
  }
  return chunks.map((element, i) => {
    const str = `${element.trim()} ${i + 1}/${chunksLength}`;
    if (str.length > maxSize) {
      throw new Error(
        `'${str}'\nText is too long, text is size is ${str.length}`
      );
    }
    console.log(`${str} - ${str.length}`);
    return str;
  });
}

function generateText(text, times) {
  let tmp = '';

  for(let i = 0; i < times; i++)
   tmp += text;

   return tmp;
}

const generatedText = generateText('1010101 1010101010 1010101010 1 ', 31000);

splitText(generatedText);