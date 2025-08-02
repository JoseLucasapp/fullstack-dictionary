import { useEffect, useRef, useState } from "react";
import {
    apiFetchWords,
    apiFetchFavorites,
    apiFetchHistory,
    type WordEntry,
    type FetchWordsResponse
} from "../../api/wordRequests";
import "./style.css";

interface Props {
    mode: "list" | "favorites" | "history";
    onSelectWord: (word: string) => void;
    search?: string;
}

const WordTable = ({ mode, onSelectWord, search }: Props) => {
    const [words, setWords] = useState<WordEntry[]>([]);
    const [nextToken, setNextToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const fetchInitial = async () => {
        setIsLoading(true);
        setWords([]);
        setNextToken(null);

        try {
            let res: FetchWordsResponse;

            if (mode === "list") {
                res = await apiFetchWords({ search: search ?? "", limit: 100 });
            } else if (mode === "favorites") {
                res = await apiFetchFavorites(undefined, 30);
            } else {
                res = await apiFetchHistory(undefined, 30);
            }

            setWords(res.results);
            setNextToken(res.next ?? null);
        } catch (err) {
            console.error("Erro ao buscar palavras:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMore = async () => {
        if (isLoading || !nextToken) return;
        setIsLoading(true);

        const el = containerRef.current;
        const prevScrollTop = el?.scrollTop || 0;

        try {
            let res: FetchWordsResponse;

            if (mode === "list") {
                res = await apiFetchWords({ search: search ?? "", limit: 100, after: nextToken });
            } else if (mode === "favorites") {
                res = await apiFetchFavorites(nextToken, 30);
            } else {
                res = await apiFetchHistory(nextToken, 30);
            }

            const newWords = res.results.filter(
                (word) => !words.some((w) => w.word === word.word)
            );

            setWords((prev) => [...prev, ...newWords]);
            setNextToken(res.next ?? null);

            setTimeout(() => {
                if (el) el.scrollTop = prevScrollTop;
            }, 0);
        } catch (err) {
            console.error("Erro ao buscar mais palavras:", err);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (mode === "list" || mode === "favorites" || mode === "history") {
            fetchInitial();
        }
    }, [mode]);

    useEffect(() => {
        if (mode === "list") {
            fetchInitial();
        }
    }, [search]);


    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 30;
            if (nearBottom) {
                fetchMore();
            }
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [mode, nextToken, isLoading]);

    return (
        <div className="wordlist-container">
            <div className="scroll-area" ref={containerRef}>
                <table className="word-table">
                    <tbody>
                        {words.length === 0 ? (
                            <tr><td colSpan={5}>Nenhuma palavra encontrada.</td></tr>
                        ) : (
                            Array.from({ length: Math.ceil(words.length / 5) }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Array.from({ length: 5 }).map((_, colIndex) => {
                                        const word = words[rowIndex * 5 + colIndex];
                                        const isValidWord = /^[a-zA-Z\- ]+$/.test(word?.word || "");

                                        return (
                                            <td key={colIndex}>
                                                {word?.word && (
                                                    <span onClick={() => isValidWord && onSelectWord(word.word)}>
                                                        {word.word}
                                                    </span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                {isLoading && <p style={{ textAlign: "center", padding: "10px" }}>Carregando...</p>}
            </div>
        </div>

    );
};

export default WordTable;
