import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoID) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        async function fetchAnswers() {
            const db = getDatabase();
            const resultRef = ref(db, "answers/" + videoID + "/questions");
            const resultQuery = query(resultRef, orderByKey());

            try {
                setLoading(true);
                setError(false);
                const snapshot = await get(resultQuery);

                if (snapshot.exists()) {
                    setAnswers((prevAnswers) => {
                        return [
                            ...prevAnswers,
                            ...Object.values(snapshot.val()),
                        ];
                    });
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }
        }

        fetchAnswers();
    }, [videoID]);

    return {
        loading,
        error,
        answers,
    };
}
