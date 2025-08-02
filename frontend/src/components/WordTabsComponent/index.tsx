import { useState } from "react";
import WordTable from "../WordTableComponent/index";
import "./style.css";

const WordTabs = ({ onSelectWord }: { onSelectWord: (word: string) => void }) => {
    const [activeTab, setActiveTab] = useState<"list" | "favorites" | "history">("list");
    const [search, setSearch] = useState("");

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleTabChange = (tab: "list" | "favorites" | "history") => {
        setActiveTab(tab);
        setSearch("");
    };

    return (
        <div className="tabs-container">
            <div className="tabs-header">
                <div className="buttons-header-tabs">
                    <button onClick={() => handleTabChange("list")} className={activeTab === "list" ? "active" : ""}>Word list</button>
                    <button onClick={() => handleTabChange("favorites")} className={activeTab === "favorites" ? "active" : ""}>Favorites</button>
                    <button onClick={() => handleTabChange("history")} className={activeTab === "history" ? "active" : ""}>History</button>
                </div>

                {activeTab === "list" && (
                    <>
                        <input
                            type="text"
                            placeholder="Search word..."
                            value={search}
                            onChange={handleSearchInputChange}
                        />
                    </>
                )}
            </div>

            <div className="tabs-content">
                {activeTab === "list" && <WordTable mode="list" search={search} onSelectWord={onSelectWord} />}
                {activeTab === "favorites" && <WordTable mode="favorites" onSelectWord={onSelectWord} />}
                {activeTab === "history" && <WordTable mode="history" onSelectWord={onSelectWord} />}
            </div>
        </div>
    );
};

export default WordTabs;
