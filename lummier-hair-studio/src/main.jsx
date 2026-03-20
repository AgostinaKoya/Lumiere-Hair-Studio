import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppHookContainer from "./AppHookContainer.jsx";
import { TurnsSelectProvider } from "./context/TurnsSelectContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <TurnsSelectProvider>
    <BrowserRouter>
      <StrictMode>
        <AppHookContainer />
      </StrictMode>
    </BrowserRouter>
  </TurnsSelectProvider>,
);
