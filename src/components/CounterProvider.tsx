
import { useState, createContext } from "react";

interface CounterContextType {
  count: number;
  plusCount: () => void;
}

export const CounterContext = createContext<CounterContextType | null>(null);

export const CounterProvider = ({ children }:{children : React.ReactNode}) => {
  const [count, setCount] = useState(0);

  const plusCount = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <CounterContext.Provider value={{ count, plusCount }}>
      {children}  
    </CounterContext.Provider>
  );
};
