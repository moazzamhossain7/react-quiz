import { useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import classes from "../styles/MiniPlayer.module.css";

export default function MiniPlayer({ id, title }) {
    const videoUrl = `https://www.youtube.com/watch?v=${id}`;
    const buttonRef = useRef();
    const [status, setStatus] = useState(false);

    function toogleMiniPlayer() {
        if (status) {
            setStatus(false);
            buttonRef.current.classList.add(classes.floatingBtn);
        } else {
            setStatus(true);
            buttonRef.current.classList.remove(classes.floatingBtn);
        }
    }

    return (
        <div
            className={`${classes.miniPlayer} ${classes.floatingBtn}`}
            ref={buttonRef}
            onClick={toogleMiniPlayer}
        >
            <span className={`material-icons-outlined ${classes.open}`}>
                play_circle_filled
            </span>
            <span
                className={`material-icons-outlined ${classes.close}`}
                onClick={toogleMiniPlayer}
            >
                {" "}
                close{" "}
            </span>
            <ReactPlayer
                className={classes.player}
                playing={status}
                controls
                url={videoUrl}
                width="300px"
                height="168px"
            />
            <p>{title}</p>
        </div>
    );
}
