import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./Components/ContextAPIs/UserContext.jsx";
import { ChangeProvider } from "./Components/ContextAPIs/ChangeContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <ChangeProvider>
       {/* <StrictMode> */}
        <App />
        {/* </StrictMode> */}
      </ChangeProvider>
    </UserProvider>
  </BrowserRouter>
);
