const fs = require('fs');

const fileStream = fs.createReadStream('pride-and-prejudice.txt', 'utf8');

let spaceCount = 0;
let wordCount = 0;
let longWordCount = 0;
let doubleLetterWordCount = 0;

fileStream.on('data', chunk => {
    spaceCount += (chunk.match(/ /g) || []).length; // Підрахунок пробілів

    const words = chunk.match(/\b\w+\b/g) || []; // Всі слова
    wordCount += words.length;

    words.forEach(word => {
        if (word.length > 5) longWordCount++; // Слова довші за 5 символів
        if (/(.)\1/.test(word)) doubleLetterWordCount++; // Слова з подвійними літерами
    });
});

fileStream.on('end', () => {
    console.log(`Кількість пробілів: ${spaceCount}`);
    console.log(`Кількість слів: ${wordCount}`);
    console.log(`Кількість слів довших за 5 символів: ${longWordCount}`);
    console.log(`Кількість слів з подвійними літерами: ${doubleLetterWordCount}`);
});

fileStream.on('error', err => {
    console.error('Помилка читання файлу:', err);
});
