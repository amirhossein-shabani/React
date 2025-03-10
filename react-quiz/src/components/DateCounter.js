import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "steStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("Unkown action");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => {
            dispatch({ type: "steStep", payload: Number(e.target.value) });
          }}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <input
          value={count}
          onChange={(e) => {
            if (isNaN(e.target.value)) return;
            dispatch({ type: "setCount", payload: Number(e.target.value) });
          }}
        />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
