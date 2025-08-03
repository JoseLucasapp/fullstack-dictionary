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
            params: { search, limit, after },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const apiFetchFavorites = async (after?: string, limit: number = 30): Promise<FetchWordsResponse> => {
    const res = await api.get<FetchWordsResponse>("user/me/favorites", {
        params: { after, limit },
    });
    return res.data;
};

export const apiFetchHistory = async (after?: string, limit: number = 30): Promise<FetchWordsResponse> => {
    const res = await api.get<FetchWordsResponse>("user/me/history", {
        params: { after, limit },
    });
    return res.data;
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
    const response = await api.get(`entries/en/${word}`);
    return response.data;
};


export const apiAddToFavorites = async (word: string): Promise<void> => {
    try {
        await api.post(`entries/en/${encodeURIComponent(word)}/favorite`);
    } catch (error) {
        throw error;
    }
};


export const apiRemoveFromFavorites = async (word: string): Promise<void> => {
    try {
        await api.post(`entries/en/${encodeURIComponent(word)}/unfavorite`);
    } catch (error) {
        throw error;
    }
};

export const apiIsFavorite = async (word: string): Promise<boolean> => {
    try {
        const res = await api.get(`entries/en/${encodeURIComponent(word)}/isFavorite`);

        return res.data?.result === true;
    } catch (error) {
        return false;
    }
};

