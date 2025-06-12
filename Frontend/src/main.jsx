import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./ContextAPIs/UserContext.jsx";
import { ChangeProvider } from "./ContextAPIs/ChangeContext.jsx";

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
