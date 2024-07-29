import { useSearchParams } from "react-router-dom";
import Select from "./Select";

//*===============================================================

//* {} are curly braces for destructing

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  //* next step, is to preserve the last selected sorting if we reload the page
  const sortBy = searchParams.get("sortBy") || ""; //*  (|| "") by default it will select the first element in options,
  //*  if we reload the page, it keep track of the last selected options before reloading

  function handleChange(e) {
    //* We set the value, received from the event
    //* to the state in the URL
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy} //* for setting the default value for options when reloading the page
    />
  );
}

export default SortBy;
