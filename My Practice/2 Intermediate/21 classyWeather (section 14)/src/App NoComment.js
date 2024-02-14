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

//*==============================================================================

class App extends React.Component {
  state = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

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

  componentDidMount() {
    // this.fetchWeather();   //* no need if  location: "" =, te initial value of this state is empty
    this.setState({ location: localStorage.getItem("location") || "" });
  } //* equivalent to: useEffect[]

  //* equivalent to: useEffect[location]
  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather(); //* this will enable us to search the weather as we type

      localStorage.setItem("location", this.state.location); //* this.state.location is already string so we don't need to use stringfy
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>

        <Input
          location={this.state.location}
          onChangeLocation={this.setLocation}
        />
        {/* <button onClick={this.fetchWeather}>Get Weather</button> */}
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

//!=========================

class Input extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="search from location ..."
          value={this.props.location}
          onChange={this.props.onChangeLocation}
        />
      </div>
    );
  }
}

class Weather extends React.Component {
  componentWillUnmount() {
    console.log("component is unmounted");
  }

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
