export default function Checkbox({ className, label, ...inputProps }) {
    return (
        <label className={className}>
            <input type="checkbox" {...inputProps} />
            <span> {label} </span>
        </label>
    );
}
