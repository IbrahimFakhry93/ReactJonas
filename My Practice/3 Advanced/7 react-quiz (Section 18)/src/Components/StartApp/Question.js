import { useQuiz } from "../../context/QuizContext";
import Options from "./Options";

function Question() {
  const { question } = useQuiz();

  console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;