function chunkify(message, characterLimit = 140) {
  let tmpPage = "9";
  const maxChunksSize = 9999;

  if (message.length <= characterLimit) {
    return message;
  }

  while (true) {
    console.log(`Trying ${tmpPage} page size`);
    let chunks = message.split(" ");
    let lineNo = 1;
    function getLine () {
      let ret = "";
      let anydone = false;
      const pg = `${lineNo}/${tmpPage}`;
      while (chunks.length) {
        let newline = ret + 
          (ret === "" ? chunks[0] : " " + chunks[0]);
        if (newline.length + pg.length +1 > 
          characterLimit) {
          break;
        }
        ret = newline;
        anydone = true;
        chunks.splice(0, 1);
      }
      if (!anydone) throw new Error("Can't do it");
      lineNo += 1;
      return ret;
    }
    const ret = [];
    while (chunks.length) ret.push(getLine());

    if (ret.length > maxChunksSize) {
      throw new Error(`Text is too long, chunks length is ${chunks.length}`);
    }

    if (ret.length.toString().length === tmpPage.length) {
      return ret.map((i,ix) => {
        const str = `${i} ${ix+1}/${ret.length}`;
        if (str.length > 140) {
          throw new Error(`${str} - ${str.length}`);
        }
        console.log(`${str} - ${str.length}`);
        return `${i} ${ix+1}/${ret.length}`;
      });
    }
    tmpPage += "9";
  }
}

function generateText(text, times) {
  let tmp = '';

  for(let i = 0; i < times; i++)
   tmp += text;

   return tmp;
}

const generatedText = generateText('Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut suscipit velit efficitur eget Sed sit amet posuere risus', 3)

chunkify(generatedText);