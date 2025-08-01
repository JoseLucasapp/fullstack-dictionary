import { useEffect, useRef, useState } from "react";
import { apiFetchWords, type WordEntry } from "../../api/wordRequests";
import "./style.css";

interface Props {
    mode: "list" | "favorites" | "history";
    onSelectWord: (word: string) => void;
}

const WordTable = ({ mode, onSelectWord }: Props) => {
    const [words, setWords] = useState<WordEntry[]>([]);
    const [nextToken, setNextToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const fetchWords = async () => {
        if (isLoading || mode !== "list") return;
        setIsLoading(true);

        try {
            const res = await apiFetchWords({
                search: "",
                limit: 30,
                after: nextToken ?? undefined,
            });

            setWords((prev) => [...prev, ...res.results]);
            setNextToken(res.next || null);
        } catch (err) {
            console.error("Erro ao buscar palavras:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setWords([]);
        setNextToken(null);
        if (mode === "list") fetchWords();
    }, [mode]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const onScroll = () => {
            const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 30;
            if (nearBottom && nextToken && !isLoading) {
                fetchWords();
            }
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, [nextToken, isLoading]);



    return (
        <div className="wordlist-container" ref={containerRef}>
            <table className="word-table">
                <tbody>
                    {Array.from({ length: Math.ceil(words.length / 5) }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: 5 }).map((_, colIndex) => {
                                const word = words[rowIndex * 5 + colIndex];
                                const isValidWord = /^[a-zA-Z\- ]+$/.test(word?.word || "");

                                return (
                                    <td key={colIndex}>
                                        {word?.word && (
                                            <span
                                                onClick={() => isValidWord && onSelectWord(word.word)}

                                            >
                                                {word.word}
                                            </span>
                                        )}
                                    </td>
                                );


                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {isLoading && <p style={{ textAlign: "center", padding: "10px" }}>Carregando...</p>}
        </div>
    );
};

export default WordTable;
