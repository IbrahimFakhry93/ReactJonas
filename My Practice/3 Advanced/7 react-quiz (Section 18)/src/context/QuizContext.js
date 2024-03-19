import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
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

function QuizProvider({ children }) {
  //& We need to display data on UI so we need state:
  // const [state, dispatch] = useReducer(reducer, initialState);
  //* use destruction
  const [
    { questions, status, index, answer, points, highScores, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  //& numQuestions derived state from questions state
  const question = questions[index];
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

  return (
    <QuizContext.Provider
      value={{
        question,
        questions,
        status,
        index,
        answer,
        points,
        highScores,
        remainingSeconds,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error(
      "QuizContext context was used outside of the QuizContextProvider"
    );
  return context;
}

export { QuizProvider, useQuiz };

//& Title: Provider and Dispatch Function
//? Provider Component
//* Here is the Provider itself where we pass all these different state values, plus the dispatch function, into the context.

//? Comparison with Previous Application
//* This is quite different to what we did earlier in the WorldWise application. There, we didn't pass the dispatch function but really just the event handler functions.

//? Dealing with Asynchronous Code
//* That was because we were dealing with asynchronous code, which is not the case here.

//? No Need for Intermediary Event Handler Functions
//* Here, we don't need any intermediary event handler functions. We can simply dispatch this function so that we can then dispatch events in the components.
