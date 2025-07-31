require("dotenv").config();
const axios = require("axios");

const ApiGetWordService = async (word) => {
    const url = `${process.env.WORD_API_URL}${word}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error(`Palavra "${word}" não encontrada.`);
        }

        console.error("Erro ao buscar palavra:", error.message);
        throw new Error("Erro ao buscar definição da palavra.");
    }
};

module.exports = { ApiGetWordService };
