import classes from "../styles/TextInput.module.css";

export default function TextInput({ icon, ...inputProps }) {
    return (
        <div className={classes.textInput}>
            <input {...inputProps} />
            <span className="material-icons-outlined">{icon}</span>
        </div>
    );
}
