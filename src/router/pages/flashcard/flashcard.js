import { FlashCardArray } from "react-flashcards";
import { useState, useEffect } from "react";
import { getQuestionsByCategory } from "../../../giveApi/services/QuestionsService";
import { useParams } from "react-router-dom";
const LogicFlashcard = () => {
    const [questions, setQuestions] = useState([]);
    const { categoryId } = useParams();
    useEffect(() => {
        const fetchQuestions = async () => {
            const result = await getQuestionsByCategory(categoryId);
            setQuestions(result);
        }
        fetchQuestions();
    }, [categoryId]);
    const flashcards = [
        ...questions.map((question) => ({
            id: parseInt(question.id),
            front: ` ${question.question}`,
            back: question.correct_answer
        }))
    ]
    return (
        <div>

            {flashcards.length > 0 && (
                <FlashCardArray cards={flashcards} autoPlay={false} />
            )}
        </div>
    )
}
export default LogicFlashcard;