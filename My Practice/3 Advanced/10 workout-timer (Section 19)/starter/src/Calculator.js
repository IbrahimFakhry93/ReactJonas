import { useCallback, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";

import { memo } from "react";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState();
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;
  //! (derived state) const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;

  // const playSound = function () {
  //* it's a reactive value because it has allowSound
  //   if (!allowSound) return;
  //   const sound = new Audio(clickSound); //* Audio is a browser feature.
  //   sound.play();
  // };
  const playSound = useCallback(
    function () {
      //* it's a reactive value because it has allowSound
      if (!allowSound) return;
      const sound = new Audio(clickSound); //* Audio is a browser feature.
      sound.play();
    },
    [allowSound]
  );

  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak); //* add Math.ceil, so when secs is half mins (50:30), so next increment turn into 50
    playSound();
  }, [number, sets, speed, durationBreak, playSound]);

  function durationInc() {
    setDuration((duration) => Math.floor(duration) + 1); //* add Math.floor, so when secs is half mins (50:30), so next increment turn into 51
    playSound();
  }
  function durationDec() {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
    playSound();
  }

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={durationDec}>–</button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button onClick={durationInc}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
