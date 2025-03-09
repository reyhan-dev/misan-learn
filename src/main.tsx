import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import { CounterProvider } from "./components/CounterProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <CounterProvider>
    <App />
  </CounterProvider>
);