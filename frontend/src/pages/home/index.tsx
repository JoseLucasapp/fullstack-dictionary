import { useState } from "react";
import "./style.css";
import AudioPlayer from "../../components/AudioPlayerComponent";
import WordTabs from "../../components/WordTabsComponent";
import { apiGetWordDetails, type WordDetailsResponse } from "../../api/wordRequests";

const HomePage = () => {
    const [leftSection, setLeftSection] = useState(false);
    const [selectedWord, setSelectedWord] = useState<WordDetailsResponse | null>(null);
    const [loadingWord, setLoadingWord] = useState(false);
    const [errorWord, setErrorWord] = useState<string | null>(null);


    const handleCloseLeftSection = () => {
        setLeftSection(false);
    }

    const handleSelectWord = async (word: string) => {
        setLeftSection(true);
        setLoadingWord(true);
        setErrorWord(null);
        setSelectedWord(null);

        try {
            const res = await apiGetWordDetails(word);
            setSelectedWord(res[0]);

            console.log(selectedWord)
        } catch (error: any) {
            const message = error?.response?.data?.message || "Erro ao buscar definição.";
            setErrorWord(message);
        } finally {
            setLoadingWord(false);
        }
    };



    return (
        <section className="home-page">
            <header className="top-content">
                <section className="logo-section">
                    <img src="/icon.png" alt="A book with a mouse, the logo." />
                    <p>Fullstack dictionary</p>
                </section>

                <section className="profile-section">
                    <p>Perfil</p>
                </section>
            </header>
            <section className="page-content">
                <section className="section-organizer">
                    <section className="left-section" style={{ display: leftSection ? "flex" : "none" }}>

                        {loadingWord && <p className="loading">Carregando...</p>}

                        {errorWord && (
                            <>
                                <a onClick={handleCloseLeftSection}>X</a>
                                <p className="error-phrase">{errorWord || "Palavra não encontrada"}</p>
                            </>)}

                        {selectedWord && !errorWord && (
                            <>
                                <a onClick={handleCloseLeftSection}>X</a>

                                <div className="word">
                                    <p>{selectedWord.word}</p>
                                    <p>{selectedWord.phonetic || ""}</p>
                                </div>

                                {selectedWord.phonetics?.[0]?.audio && (
                                    <AudioPlayer audio={selectedWord.phonetics[0].audio} />
                                )}

                                <h2>Meanings</h2>
                                {selectedWord.meanings.map((meaning, i) => (
                                    <div key={i} className="meanings">
                                        {meaning.definitions.map((def, j) => (
                                            <p key={j}>
                                                <span>{meaning.partOfSpeech} - {def.definition}</span>
                                            </p>
                                        ))}
                                    </div>
                                ))}
                            </>
                        )}

                    </section>
                    <section className="right-section" style={{ width: leftSection ? "65%" : "100%" }}>
                        <WordTabs onSelectWord={handleSelectWord} />
                    </section>
                </section>
            </section>
        </section>
    )
}

export default HomePage