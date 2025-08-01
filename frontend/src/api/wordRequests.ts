import api from "./config";

export interface WordEntry {
    word: string;
    added: string;
}

export interface FetchWordsResponse {
    results: WordEntry[];
    totalDocs: number;
    previous?: string;
    next?: string;
    hasNext: boolean;
    hasPrev: boolean;
}

interface FetchWordsParams {
    search: string;
    limit?: number;
    after?: string;
}

export const apiFetchWords = async ({
    search,
    limit = 20,
    after,
}: FetchWordsParams): Promise<FetchWordsResponse> => {
    try {
        const response = await api.get<FetchWordsResponse>("entries/en", {
            params: {
                search,
                limit,
                after,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export interface WordDetailsResponse {
    word: string;
    phonetic?: string;
    phonetics?: {
        text?: string;
        audio?: string;
    }[];
    meanings: {
        partOfSpeech: string;
        definitions: {
            definition: string;
            example?: string;
        }[];
    }[];
}

export const apiGetWordDetails = async (word: string): Promise<WordDetailsResponse[]> => {
    const response = await api.get(`/entries/en/${word}`);
    console.log(response.data);
    return response.data;
};
