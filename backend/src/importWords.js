require('dotenv').config()
const fs = require("fs");
const readline = require("readline");
const mongoose = require("mongoose");
const Word = require("./models/Word");

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado ao MongoDB");
    importWords("./english.txt");
}).catch(err => {
    console.error("Erro ao conectar:", err);
});

async function importWords(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let total = 0;
    for await (const line of rl) {
        const word = line.trim();
        if (word.length === 0) continue;

        try {
            await Word.updateOne(
                { word },
                { $setOnInsert: { word } },
                { upsert: true }
            );
            total++;
        } catch (err) {
            console.error(`Erro ao inserir "${word}":`, err.message);
        }
    }

    console.log(`Importação finalizada com ${total} palavras.`);
    mongoose.disconnect();
}
