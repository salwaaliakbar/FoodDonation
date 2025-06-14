import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { ChangeProvider } from "./context/ChangeContext.jsx";

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
