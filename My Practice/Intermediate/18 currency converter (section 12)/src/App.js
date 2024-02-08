import { useEffect, useState } from "react";
import "./index.css";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
function App() {
  const [money, setMoney] = useState(1);
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");
  const [output, setOutput] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function convertCurr() {
        // try {
        // if (typeof (money) === "string")
        //   throw new Error("Input data must be number");

        // } catch (err) {
        //   if (err.name !== "AbortError") setError(err.message);
        // }

        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${money}&from=${currency1}&to=${currency2}`
          );

          if (!res.ok) throw new Error("Internet connection lost");

          const data = await res.json();
          console.log(data);
          const { rates } = data;
          if (!rates) throw new Error("can not exchange from same unit");
          setOutput(rates[currency2]);
        } catch (err) {
          console.log(err);
          console.error(err);
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (currency1 === currency2) return setOutput(1);

      convertCurr();

      return function () {
        controller.abort();
      };
    },
    [money, currency1, currency2]
  );

  return (
    <div>
      <input
        type="number"
        value={money}
        onChange={(e) => setMoney(Number(e.target.value))}
        disabled={isLoading}
      />
      <select value={currency1} onChange={(e) => setCurrency1(e.target.value)}  disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={currency2} onChange={(e) => setCurrency2(e.target.value)}  disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {error ? (
        <Error error={error} />
      ) : (
        <p>
          {output} {currency2}
        </p>
      )}
    </div>
  );
}

function Error({ error }) {
  return <p>{error}</p>;
}

export default App;

// I like to use the analogy,

// that this dependency array is essentially

// like listening for one of these three variables to change.

// And then each time that happens,

// it will just re-execute our effect again.

// And so this means that really,

// our effect is now synchronized to these three variables.
