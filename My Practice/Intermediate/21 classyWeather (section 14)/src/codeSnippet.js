import { useEffect, useState } from "react";
//& Title: using Map Data Structure:
(function () {
  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }

  //& Title: Format day / Date:

  function formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }

  //& Conditional render based on property existence of a state object (weather)
  const [weather, setWeather] = useState({});
  {
    weather.weathercode && (
      <Weather weather={weather} displayLocation={displayLocation} />
    );
  }

  //& Title: Initialize state by local storage value:

  const [location, setLocation] = useState(
    localStorage.getItem("location") || ""
  );

  //* no need of .json method because we want to receive te value as string not object
  //* .json() convert json (Javascript string object notation) to object

  //! Why localStorage.getItem("location") || "" ?
  //* when we run this up for the first time there won't be no local storage yet
  //* at least not with this key ("location"). And so let's then set a default off an empty string.

  //& Title: Looping on multiple array by map method index (i), object destructing, conditional rendering

  function Weather({ weather }) {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: code,
    } = weather;
    return (
      <div>
        <ul className="weather">
          //* Looping on multiple array by map method index (i)
          {dates.map((date, i) => (
            <Day
              day={date}
              max={max.at(i)}
              min={min.at(i)}
              code={code.at(i)}
              key={date}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }

  function Day({ day, max, min, code, isToday }) {
    return (
      <li className="day">
        //* conditional content rendering by boolean value of isToday={i === 0}
        <p>{isToday ? "Today" : formatDay(day)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}</strong>&deg;
        </p>
      </li>
    );
  }
})();
