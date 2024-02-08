import React from "react";
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

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

//* video 183
//& Title: Implementing Features with Lifecycle Methods

//* We are going to use three important lifecycle methods: componentDidMount, componentDidUpdate, and componentWillUnmount.

//* The first feature we want to implement is to search for weather as we type. Each time that we type, a new search will be fired off.

//* The second feature is to remember our location in local storage each time we type a new location.

//? Lifecycle Methods
//* Lifecycle methods are special methods that all React components get access to. We can use them to run side effects at different points of the component lifecycle: mounting, re-rendering, and unmounting.

//* Lifecycle methods are not exactly the same thing as the useEffect hook in function components, but they are the closest similar thing that we have in class components.

//? Storing Location in Local Storage
//* Each time that we type a new character, we want to store the location into local storage. The componentDidUpdate lifecycle method is the perfect place for doing that.

//? Reading from Local Storage
//* We want to read the location value from local storage as the component mounts. The componentDidMount lifecycle method is the perfect place for doing that. Here we will want to set our state, based on that data that's coming from local storage.

//*==============================================================================

//& Difference between App and here App-1
//* that we use here lifecycle methods which are similar to useEffect and its dep array
//* to fetch data without handling a button click as in App.js. No button is used here.
//* Also we apply the localStorage

//& using class field Javascript feature

//* in JavaScript with class fields, we can declare properties directly
//* on a component instance, in the class definition, so outside of any method.

//* no need for constructor

class App extends React.Component {
  state = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  //& using arrow function in method declaration
  //* We can now use an arrow function here.
  //* And the great advantage of that is that arrow functions do not lose their binding to the "this" keyword.
  //* So arrow functions don't have their own "this" keyword, and instead they get access to the surrounding one,

  //* so fetchWeather is defined as normal variable
  fetchWeather = async () => {
    if (this.state.location.length < 2) return this.setState({ weather: {} }); //* weather:{} will unmount weather comp, because weather comp is conditionally render or mount when weather object has properties not empty object, so we can test componentDidUnmount
    try {
      this.setState({ isLoading: true });
      //* 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      //* 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  //& Child (input comp) Parent (App comp) communication
  //* 1) create arrow handle function
  setLocation = (e) => this.setState({ location: e.target.value });
  //* 2) pass it as prop to input component

  //*==========

  //& componentDidMount
  //* And as the name of the method says, this one is called immediately after rendering.
  //* So after the dom has been created, just like a use effect hook with the empty dependency array.
  //* And so this is the ideal place to perform some initial side effects as the component loads.

  //*? equivalent to: useEffect[]
  componentDidMount() {
    // this.fetchWeather();   //* no need if  location: "" =, te initial value of this state is empty
    this.setState({ location: localStorage.getItem("location") || "" });

    //! Why localStorage.getItem("location") || "" ?
    //* when we run this up for the first time there won't be no local storage yet
    //* at least not with this key ("location"). And so let's then set a default off an empty string.
  }
  //*=================

  // let's just analyze what happens here.

  // So, as the component is mounted,

  // it will then read this value here

  // from local storage right here.

  // So, in this lifecycle method (componentDidUpdate).

  // So, this then sets the state,

  // which will in turn re-render the component.

  // And so, then after that re-render,

  // the component did update method will get called.

  // And so that's where we then fetch the weather

  //*=================

  //& componentDidUpdate
  //* componentDidUpdate gives access to the previous state and the previous props.
  //* So the first argument is the previous props and the second one is the previous state.
  //* And so it's similar to the use effect hook with some variable here in the dependency array.
  //* For example, we can now use these previous state here to check if the location has changed.
  //* And so, that's then similar to having a use effect with location in the dependency array.

  //* equivalent to: useEffect[location]
  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather(); //* this will enable us to search the weather as we type

      localStorage.setItem("location", this.state.location); //* this.state.location is already string so we don't need to use stringfy it
    }
  }

  //& Difference between useEffect with dep array argument and componentDidUpdate
  //* The difference is that this method (componentDidUpdate)right here
  //* is not called on mount. Only is called on re-render,
  //! while this use effect
  //* it also can be called on mount and also on the initial render.

  //& downside:

  //* One downside is that our fetching logic here is now spread
  //* across these two lifecycle methods, on (componentDidMount and componentDidUpdate)
  //* So fetching the weather on mount (componentDidMount) and also on re-render (componentDidUpdate)

  //* And so, then we need to call this function here in two places.
  //* that's a big deal in real world applications, this used to be really a big problem.
  //* to have logic that belongs together spread out over these different methods.
  //* So, that then makes the code a lot harder to understand

  //! solution: using useEffect
  //* and to use effect actually solved some of these problems.
  //* because  this effect like this (useEffect[location]) would run both on mount and on re-render.

  //*===========
  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <Input
          location={this.state.location}
          onChangeLocation={this.setLocation}
        />
        {/* <button onClick={this.fetchWeather}>Get Weather</button> */} //* no
        need for button, we use lifecycle methods
        {this.state.isLoading && <p className="loader">Loading....</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            displayLocation={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;
//* 3) register the handler event to onChange event or any other event in the component
class Input extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="search from location ..."
          value={this.props.location}
          //* in this event handler function we didn't have to manually bind the (this) keyword.
          //* We only have to do that when we define the event handler as an outside method, like as in fetchWeather
          onChange={this.props.onChangeLocation}
        />
      </div>
    );
  }
}

//& componentWillUnmount
//* this lifecycle method is mostly used to clean up  after some effects
class Weather extends React.Component {
  //   when there is no string here

  // then there's also no weather component.

  // So, we can just then use component will unmount.

  componentWillUnmount() {
    console.log("component is unmounted");
  }

  //* this is very similar to returning a cleanup function from a effect function.

  //& Difference between componentWillUnmount and a cleanup function
  //* The difference is that this one really only runs after the component unmounts,
  //* so after it disappears and is destroyed, not between renders as in clean up function

  render() {
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: code,
    } = this.props.weather;

    return (
      <div>
        <h2>{`Weather for: ${this.props.displayLocation}`}</h2>
        <ul className="weather">
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
}

class Day extends React.Component {
  render() {
    const { day, max, min, code, isToday } = this.props;
    console.log(code);
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(day)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}</strong>&deg;
        </p>
      </li>
    );
  }
}

//*==================
