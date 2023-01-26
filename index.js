function splitText(text) {
  if (text.length <= 140) {
    return text;
  }

  const chunks = text.match(/.{1,137}\b/g);
  const chunksLength = chunks.length;
  if (chunksLength > 9999) {
    throw new Error(`Text is too long, chunks length is ${chunksLength}`);
  }
  return chunks.map(
    (element, i) => `${element.trim()} ${i + 1}/${chunksLength}`
  );
}

console.log(
  splitText(
    "Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut suscipit velit efficitur eget Sed sit amet posuere risus"
  )
);
