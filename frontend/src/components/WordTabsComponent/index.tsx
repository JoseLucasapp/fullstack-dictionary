import { useState } from "react";
import WordTable from "../WordTableComponent/index";
import "./style.css";

const WordTabs = ({ onSelectWord }: { onSelectWord: (word: string) => void }) => {
    const [activeTab, setActiveTab] = useState<"list" | "favorites" | "history">("list");

    return (
        <div className="tabs-container">
            <div className="tabs-header">
                <button onClick={() => setActiveTab("list")} className={activeTab === "list" ? "active" : ""}>Word list</button>
                <button onClick={() => setActiveTab("favorites")} className={activeTab === "favorites" ? "active" : ""}>Favorites</button>
                <button onClick={() => setActiveTab("history")} className={activeTab === "history" ? "active" : ""}>History</button>
            </div>

            <div className="tabs-content">
                {activeTab === "list" && <WordTable mode="list" onSelectWord={onSelectWord} />}
                {activeTab === "favorites" && <WordTable mode="favorites" onSelectWord={onSelectWord} />}
                {activeTab === "history" && <WordTable mode="history" onSelectWord={onSelectWord} />}
            </div>
        </div>
    );
};

export default WordTabs;
