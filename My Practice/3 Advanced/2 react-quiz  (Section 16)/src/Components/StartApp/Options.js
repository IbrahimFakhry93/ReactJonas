function Options({ question, answer, dispatch }) {
  const isAnswered = answer !== null; //* that means if there is an answer
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          //* first css class "answer" will shift the selected answer to the left (whether it's correct or wrong)
          //* look at the UI
          // className={`btn btn-option ${index === answer ? "answer" : ""} ${
          //   isAnswered
          //     ? index === question.correctOption
          //       ? "correct"
          //       : "wrong"
          //     : ""
          // }`}

          // className={`btn btn-option ${index === answer ? "answer" : ""} ${
          //   isAnswered
          //     ? index === question.correctOption
          //       ? "correct"
          //       : index === answer
          //       ? "wrong-selected"
          //       : "wrong"
          //     : ""
          // }`}
          className={`btn btn-option ${index === answer && "answer"} ${
            isAnswered &&
            ((index === question.correctOption && "correct") ||
              (index === answer && "wrong-selected") ||
              "wrong")
          }`}
          disabled={isAnswered}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

//* class={`btn btn-option ${index === answer ? 'answer':''}`}
//* index === answer this will be achieved, when the button is clicked
