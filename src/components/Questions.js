import classes from "../styles/Question.module.css";
import Answer from "./Answer";

export default function Questions({ answers }) {
    return answers.map((question, index) => (
        <div className={classes.question} key={index}>
            <div className={classes.qtitle}>
                <span className="material-icons-outlined">help_outline</span>
                {question.title}
            </div>
            <Answer options={question.options} input={false} />
        </div>
    ));
}
