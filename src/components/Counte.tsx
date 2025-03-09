import { useContext } from "react";
import { CounterContext } from "./CounterProvider";

const Counter = () => {
  const counterContext = useContext(CounterContext);

  if (!counterContext) {
    throw new Error("CounterContext must be used within a CounterProvider");
  }

  const { count, plusCount } = counterContext;
  return (
    <div className="text-white text-xl w-10 pr-1 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex justify-center items-center shadow-lg hover:shadow-xl transition-all duration-200">
      <button onClick={plusCount}>+</button>
 
    </div>
  );
};

export default Counter;
