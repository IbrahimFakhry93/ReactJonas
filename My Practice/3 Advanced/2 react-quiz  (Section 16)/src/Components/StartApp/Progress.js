function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints} points
      </p>
    </header>
  );
}

export default Progress;

//& Title: Understanding Progress Bar Update Logic

//? The 'value' Attribute
//* The 'value' attribute of the 'progress' element specifies how much of the task has been completed. It represents the current value of the progress bar.

//* In the code 'value={index + Number(answer !== null)}', the progress bar is updated based on the current question index and whether an answer has been selected.

//? Breakdown of 'value={index + Number(answer !== null)}'
//* 'index' is the current question number (0-based index). It represents how many questions have been asked so far.
//* 'answer !== null' checks if an answer has been selected for the current question. If an answer has been selected, it returns 'true'; otherwise, it returns 'false'.
//* 'Number(answer !== null)' converts the boolean value ('true' or 'false') to a number. In JavaScript, 'Number(true)' returns '1' and 'Number(false)' returns '0'.
//* So, 'index + Number(answer !== null)' will return the current question number if an answer has been selected, and the previous question number if no answer has been selected yet. This value is used to update the progress bar.
