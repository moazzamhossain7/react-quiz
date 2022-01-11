import SignupImage from "../../assets/images/signup.svg";
import classes from "../../styles/Signup.module.css";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

export default function Signup() {
    return (
        <>
            <h1>Create an account</h1>
            <div className="column">
                <Illustration image={SignupImage} />
                <Form className={`${classes.signup}`} action="#">
                    <TextInput
                        type="text"
                        placeholder="Enter name"
                        icon="person"
                    />

                    <TextInput
                        type="text"
                        placeholder="Enter email"
                        icon="alternate_email"
                    />

                    <TextInput
                        type="password"
                        placeholder="Enter password"
                        icon="lock"
                    />

                    <TextInput
                        type="password"
                        placeholder="Confirm password"
                        icon="lock_clock"
                    />

                    <Checkbox label="I agree to the Terms &amp; Condition" />

                    <Button>
                        <span>Submit now</span>
                    </Button>

                    <div className="info">
                        Already have an account?
                        <a href="login.html"> Login</a> instead.
                    </div>
                </Form>
            </div>
        </>
    );
}
