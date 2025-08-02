import { useState } from "react";
import "./style.css";
import AudioPlayer from "../../components/AudioPlayerComponent";
import WordTabs from "../../components/WordTabsComponent";
import { apiGetWordDetails, apiAddToFavorites, apiIsFavorite, apiRemoveFromFavorites, type WordDetailsResponse } from "../../api/wordRequests";
import Swal from 'sweetalert2'
import { apiGetUserInfo, type UserProfile } from "../../api/userRequests";

const HomePage = () => {
    const [leftSection, setLeftSection] = useState(false);
    const [selectedWord, setSelectedWord] = useState<WordDetailsResponse | null>(null);
    const [loadingWord, setLoadingWord] = useState(false);
    const [errorWord, setErrorWord] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);



    const openProfile = async () => {
        try {
            const userData = await apiGetUserInfo();
            setUser(userData);
            setShowProfileModal(true);
        } catch (err) {
            Swal.fire("Error", "Unable to load profile", "error");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };



    const handleCloseLeftSection = () => {
        setLeftSection(false);
    }

    const handleSelectWord = async (word: string) => {
        setLeftSection(true);
        setLoadingWord(true);
        setErrorWord(null);
        setSelectedWord(null);
        setIsFavorite(false);

        try {
            const res = await apiGetWordDetails(word);
            setSelectedWord(res[0]);

            const fav = await apiIsFavorite(word);
            setIsFavorite(fav);
        } catch (error: any) {
            const message = error?.response?.data?.message || "Error trying to find definition.";
            setErrorWord(message);
        } finally {
            setLoadingWord(false);
        }
    };



    const handleFavorite = async () => {
        try {
            if (selectedWord) {
                await apiAddToFavorites(selectedWord.word);
                setIsFavorite(true);
                Swal.fire("Success!", `Word ${selectedWord.word} added to favorites`, "success");
            }
        } catch (err) {
            Swal.fire("Error!", "Word not added to favorites", "error");
        }
    };

    const handleUnfavorite = async () => {
        try {
            if (selectedWord) {
                await apiRemoveFromFavorites(selectedWord.word);
                setIsFavorite(false);
                Swal.fire("Success!", `Word ${selectedWord.word} removed from favorites`, "success");
            }
        } catch (err) {
            Swal.fire("Error!", "Word not removed from favorites", "error");
        }
    };


    return (
        <>
            <section className="home-page">
                <header className="top-content">
                    <section className="logo-section">
                        <img src="/icon.png" alt="A book with a mouse, the logo." />
                        <p>Fullstack dictionary</p>
                    </section>

                    <section className="profile-section">
                        <p onClick={openProfile}>Profile</p>
                    </section>
                </header>
                <section className="page-content">
                    <section className="section-organizer">
                        <section className="left-section-home" style={{ display: leftSection ? "flex" : "none" }}>
                            <div className="content-scroll">
                                {loadingWord && <p className="loading">Loading...</p>}

                                {errorWord && (
                                    <>
                                        <a onClick={handleCloseLeftSection}>X</a>
                                        <p className="error-phrase">{errorWord || "Word not found"}</p>
                                    </>

                                )}

                                {selectedWord && !errorWord && (
                                    <>

                                        <div className="top-word-container-options">
                                            <a onClick={handleCloseLeftSection}>X</a>
                                            {isFavorite ? (
                                                <button onClick={handleUnfavorite}>Unfavorite</button>
                                            ) : (
                                                <button onClick={handleFavorite}>Favorite</button>
                                            )}
                                        </div>


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
                            </div>
                        </section>

                        <section className={`right-section-home ${leftSection ? "with-left-open" : ""}`}>
                            <WordTabs onSelectWord={handleSelectWord} />
                        </section>

                    </section>
                </section>
            </section>

            {showProfileModal && user && (
                <section className="profile-modal">
                    <div className="profile-card">
                        <button className="close-btn" onClick={() => setShowProfileModal(false)}>X</button>
                        <h2>Profile</h2>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </section>
            )}

        </>
    )
}

export default HomePage