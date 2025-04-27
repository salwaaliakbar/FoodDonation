import Recipent_Dashboard from "./Components/Recipent_Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/Landingpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/recepeinetDashBoard" element={<Recipent_Dashboard/>}/>
          {/* <Route path="/donarDashBoard" element={<Donor_Dashboard/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
