import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { SocketProvider } from "./context/SocketProvider.jsx";
import { ChangeProvider } from "./Context/ChangeContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <ChangeProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ChangeProvider>
    </UserProvider>
  </BrowserRouter>
);
