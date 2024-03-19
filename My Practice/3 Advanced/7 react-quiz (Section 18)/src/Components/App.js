import "../index.css";
import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./StartApp/Question.js";
import NextQuestion from "./StartApp/NextQuestion.js";
import Progress from "./StartApp/Progress.js";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer.js";
import Timer from "./StartApp/Timer.js";
import { useQuiz } from "../context/QuizContext.js";

export default function App() {
  const { status } = useQuiz();
  //&  display different UIs inside <Main/> for different status situations (loading,ready,error)
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />

            <Footer>
              <NextQuestion />
              <Timer />
            </Footer>
          </>
        )}

        {status === "finish" && <FinishScreen />}
      </Main>
    </div>
  );
}

//& Create fake Api:

//* install in other running terminal: npm i json-server
//* in package.json in scripts add this: "server": "json-server --watch data/questions.json --port 9000"
//* npm run server

//& Title: Feature Ideas

//? Idea 1: Start Screen Customization
//* We could enhance the start screen by allowing the user to select a certain number of questions or filter for the difficulty of questions.

//? Idea 2: High Score Persistence
//* We could upload the high score of the quiz to our fake API.
//* Then, when we reload the application later, we could re-fetch the high score and place it back in our state so that we don't lose that value.

//? Idea 3: Storing All Answers
//* Instead of just storing the current answer, we could store all the answers in an array.
//* This would allow the user to go back and forth in time and review their answers.
