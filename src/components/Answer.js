import classes from "../styles/Answer.module.css";
import Checkbox from "./Checkbox";

export default function Answer() {
    return (
        <div className={classes.answers}>
            <Checkbox className={`${classes.answer}`} label="Answer One" />
            <Checkbox
                className={`${classes.answer} ${classes.wrong}`}
                label="Answer One"
            />
            <Checkbox
                className={`${classes.answer} ${classes.correct}`}
                label="Answer One"
            />
        </div>
    );
}
