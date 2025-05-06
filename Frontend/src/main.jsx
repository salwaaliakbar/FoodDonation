import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./Components/ContextAPIs/UserContext.jsx";
import { ChangeProvider } from "./Components/ContextAPIs/ChangeContext.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <ChangeProvider>
      {/* <StrictMode> */}
      <App />
      {/* </StrictMode> */}
    </ChangeProvider>
  </UserProvider>
);
