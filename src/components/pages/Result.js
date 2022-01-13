import _ from "lodash";
import { useLocation, useParams } from "react-router-dom";
import useAnswers from "../../hooks/useAnswers";
import Analysis from "../Analysis";
import Summary from "../Summary";

export default function Quiz() {
    const { state } = useLocation();
    const { id } = useParams();
    const { loading, error, answers } = useAnswers(id);

    // calculate user score
    function calculate() {
        let score = 0;

        answers.forEach((question, questionIndex) => {
            const correctIndexes = [],
                checkedIndexes = [];

            question.options.forEach((option, optionIndex) => {
                if (option.correct) correctIndexes.push(optionIndex);
                if (state[questionIndex].options[optionIndex].checked) {
                    checkedIndexes.push(optionIndex);
                    option.checked = true;
                }
            });

            if (_.isEqual(correctIndexes, checkedIndexes)) score += 5;
        });

        return score;
    }

    const userScore = calculate();

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was something went wrong!</div>}
            {!loading && !error && answers && answers.length > 0 && (
                <>
                    <Summary score={userScore} qna={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}
        </>
    );
}
