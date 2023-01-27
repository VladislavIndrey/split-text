const MAX_TEXT_SIZE = 140;
const MAX_CHUNKS_SIZE = 9999;
const testText = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna ' +
    'pretium suscipit Nam commodo mauris felis ut suscipit velit efficitur eget Sed sit amet posuere risus ' +
    'Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit ' +
    'Nam commodo mauris felis ut suscipit velit efficitur eget Sed sit amet posuere risus ';
const testText2 = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio ' +
    'at magna pretium suscipit Nam commodo mauris felis ut suscipit velit efficitur eget Sed sit amet posuere risus';

function splitTex(text) {
    const words = text.split(' ');
    let chunks = [];
    let n = 0;
    let i = 0;
    let k = 1;

    if (words.length === 1 && text > MAX_TEXT_SIZE) {
        throw new Error(`Text it too long, text size is: ${text.length}`);
    }

    if (text.length <= MAX_TEXT_SIZE) {
        return text;
    }

    n = testChunks(words);

    if (n > MAX_CHUNKS_SIZE) {
        throw new Error(`Text is too long, chunks length is ${n}`);
    }

    while (true) {
        let str = '';

        while (true) {
            if (i === words.length) {
                console.log(`${str + `${k}/${n}`} - ${(str + ` ${k}/${n}`).length}`);
                chunks.push(str + ` ${k}/${n}`);
                return chunks;
            }

            if ((str + words[i] + `${k}/${n}`).length < MAX_TEXT_SIZE) {
                str += words[i] + ' ';
                ++i;
                continue;
            }

            console.log(`${str + `${k}/${n}`} - ${(str + `${k}/${n}`).length}`);
            chunks.push(str + ` ${k}/${n}`);
            str = '';
            ++k;
        }
    }

}

function generateText(text, times) {
    let tmp = '';

    for (let i = 0; i < times; i++)
        tmp += text;

    return tmp;
}

const generatedText = generateText('He h lool wew', 3000);

console.log(testChunks(generatedText.split(' ')));
splitTex(generatedText);

function testChunks(words) {
    let i = 0;
    let k = 1;
    let n = 1;
    let str = '';

    let cycle = 1;
    let page = '9';
    let oldPage = '';

    while (true) {
        let str = '';

        while (true) {
            if (i === words.length) {
                return n;
            }

            if ((str + words[i] + `${k}/${n}`).length < MAX_TEXT_SIZE) {
                str += words[i] + ' ';
                ++i;
                continue;
            }

            str = '';
            ++k;
            ++n;
        }
    }
}