const MAX_TEXT_SIZE = 140;
const MAX_CHUNKS_SIZE = 9999;

function splitTex(text) {
    const words = text.split(' ');
    let chunks = [];
    let chunksCount = 0;
    let chunkIndex = 1;
    let wordIndex = 0;

    if (text.length <= MAX_TEXT_SIZE) {
        return text;
    }

    if (words.some((word) => word.length > MAX_TEXT_SIZE)) {
        throw new Error(`Some of word's length is more than ${MAX_TEXT_SIZE}`);
    }

    chunksCount = calculateChunks(words);

    if (chunksCount > MAX_CHUNKS_SIZE) {
        throw new Error(`Text is too long, chunks length is ${chunksCount}`);
    }

    while (true) {
        let tpmText = '';

        while (true) {
            if (wordIndex === words.length) {
                chunks.push(createChunk(tpmText, chunkIndex, chunksCount));
                return chunks;
            }

            if (words[wordIndex].length > MAX_TEXT_SIZE) {
                throw new Error(`Word '${words[wordIndex]} is too long, it's length is ${words[wordIndex].length}`)
            }

            if (createChunk(tpmText + words[wordIndex], chunkIndex, chunksCount).length < MAX_TEXT_SIZE) {
                tpmText += words[wordIndex] + ' ';
                ++wordIndex;
                continue;
            }

            chunks.push(createChunk(tpmText, chunkIndex, chunksCount));
            tpmText = '';
            ++chunkIndex;
        }
    }
}

function calculateChunks(words) {
    let wordIndex = 0;
    let chunkIndex = 1;
    let chunksCount = 1;

    while (true) {
        let tempText = '';
        wordIndex = 0;
        chunkIndex = 1;

        while (true) {

            if (chunksCount.toString().length < chunkIndex.toString().length) {
                chunksCount = chunkIndex;
                break;
            }

            if (wordIndex === words.length) {
                return chunkIndex;
            }

            if (createChunk(tempText + words[wordIndex], chunkIndex, chunksCount).length < MAX_TEXT_SIZE) {
                tempText += words[wordIndex] + ' ';
                ++wordIndex;
                continue;
            }

            tempText = '';
            ++chunkIndex;
        }
    }
}

function createChunk(text, k, n) {
    return `${text}${k}/${n}`;
}

console.log(splitTex('Your text'));