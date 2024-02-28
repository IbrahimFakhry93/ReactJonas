import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../Contexts/citiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  console.log(cities);
  if (!cities.length) return <Message message="click on the map" />;
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((city) => city.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}

      {/* key={country.country}: country here is unique as a result of reduce method above  */}
    </div>
  );
}

export default CountryList;
