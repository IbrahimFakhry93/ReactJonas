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

//& note at the end at video 21 min:
//* all the state lives in the App, so when a state update, the App will re-render and the children components will re-render as well
//* that will cause a performance issue

//& time for each question:
const SECS_PER_QUES = 30; //* convention for variable to write as this

const initialState = {
  questions: [],

  //& To display the status of Application
  //* loading /error/ready/active/finished
  status: "loading",

  //& To display the question and answers
  index: 0, //* We will use this index to take a certain question object out of the questions array.
  //* And so the first element of this questions array is element number zero,
  //* and index need to be a piece of state because it will re-render the screen to display the next question when the index is updated

  //& To display the correct and wrong answers
  //* once we click on selected option or answer, re-render required so create state answer
  answer: null, //* null because initially there is no answer

  //& To display and update the scores
  points: 0,

  //& To display the highScores across multiple quiz trials
  highScores: 0, //* it is a state because we want it to preserved across renders

  //& To display the timer
  remainingSeconds: null, //* calculate the seconds for each question based on number of questions, it's null at start, because we haven't fetch (get) the questions yet
  //* we will calculate (remainingSeconds) at the case: start as downwards
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }; //* we updated these two state variables (questions , status), so these two pieces of state, all in one dispatch.
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUES,
      };
    case "newAnswer":
      const question = state.questions.at(state.index); //* get the current question
      //* and here we are leveraging the current state that we get into the reducer to compute the next state. So really relying on that current state.
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points, //* check if the current question is equal to the received answer.
        //* we place points because it is logic when the answer is received we update the score
      }; //* we updated these two state variables (questions , status), so these two pieces of state, all in one dispatch.

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }; //* answer null to reset the answers or options after navigate to next question

    case "finish":
      return {
        ...state,
        status: "finish",
        highScores:
          state.points > state.highScores ? state.points : state.highScores,
      };
    case "reset":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        //& this line down entire heart of timer feature
        status: state.remainingSeconds === 0 ? "finish" : state.status,
      };
    default:
      return new Error("Action unknown");
  }
}

export default function App() {
  //& We need to display data on UI so we need state:
  // const [state, dispatch] = useReducer(reducer, initialState);
  //* use destruction
  const [
    { questions, status, index, answer, points, highScores, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  //& numQuestions derived state from questions state
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  //& fetch data on mount
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  //&  display different UIs inside <Main/> for different status situations (loading,ready,error)
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />

            <Footer>
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
            </Footer>
          </>
        )}

        {status === "finish" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScores={highScores}
            dispatch={dispatch}
          />
        )}
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
