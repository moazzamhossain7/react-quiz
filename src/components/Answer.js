import { Fragment } from "react/cjs/react.production.min";
import classes from "../styles/Answer.module.css";
import Checkbox from "./Checkbox";

export default function Answer({ options = [], handleChange, input }) {
    return (
        <div className={classes.answers}>
            {options.map((option, index) => (
                <Fragment key={index}>
                    {input ? (
                        <Checkbox
                            className={`${classes.answer}`}
                            label={option.title}
                            value={index}
                            checked={option.checked}
                            onChange={(e) => handleChange(e, index)}
                        />
                    ) : (
                        <Checkbox
                            className={`${classes.answer} ${
                                option.correct
                                    ? classes.correct
                                    : option.checked
                                    ? classes.wrong
                                    : null
                            }`}
                            label={option.title}
                            defaultChecked={option.checked}
                            disabled
                        />
                    )}
                </Fragment>
            ))}
        </div>
    );
}
