import { useRef, useState } from "react";
import "./style.css";

const AudioPlayer = ({ audio }: { audio: string }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(percent || 0);
    };

    return (
        <div className="audio-player">
            <audio
                ref={audioRef}
                src={audio}
                onTimeUpdate={handleTimeUpdate}
            />
            <div className="progress-wrapper" onClick={togglePlay}>
                <div className="triangle" />
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
