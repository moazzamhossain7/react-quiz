import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Answer from "../Answer";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;

const reducer = (state, action) => {
    switch (action.type) {
        case "questions":
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false;
                });
            });
            return action.value;

        case "answer":
            const questions = _.cloneDeep(state);
            questions[action.questionId].options[action.optionIndex].checked =
                action.value;
            return questions;

        default:
            return state;
    }
};

export default function Quiz() {
    const { id } = useParams();
    const { loading, error, questions } = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [qna, dispatch] = useReducer(reducer, initialState);

    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: "questions",
            value: questions,
        });
    }, [questions]);

    // handle question answer given by user
    function handleQuestionAnswer(e, index) {
        dispatch({
            type: "answer",
            questionId: currentQuestion,
            optionIndex: index,
            value: e.target.checked,
        });
    }

    // step forward to next question
    function nextQuestion() {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion((currentQuestion) => currentQuestion + 1);
        }
    }

    // step backward to previous question
    function previousQuestion() {
        if (currentQuestion > 0 && currentQuestion <= questions.length) {
            setCurrentQuestion((currentQuestion) => currentQuestion - 1);
        }
    }

    // calculate percentage for progress bar
    const percentage =
        questions.length > 0
            ? ((currentQuestion + 1) / questions.length) * 100
            : 0;

    // submit quiz after all question answerd
    async function submit() {
        const { uid } = currentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);
        await set(resultRef, {
            [id]: qna,
        });

        navigate(`/result/${id}`, { state: qna });
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was something wrong!</div>}
            {!loading && !error && qna && qna.length > 0 && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answer
                        input
                        options={qna[currentQuestion].options}
                        handleChange={handleQuestionAnswer}
                    />
                    <ProgressBar
                        next={nextQuestion}
                        prev={previousQuestion}
                        submit={submit}
                        progress={percentage}
                    />
                    <MiniPlayer />
                </>
            )}
        </>
    );
}
