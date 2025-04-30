import Recipent_Dashboard from "./Components/Recipent_Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/Landingpage";
import GeneralFeed from "./Components/GeneralFeed";
import DonorDashboard from "./Components/DonorDashboard";
import About from "./Components/About";

function App() {
  return (
    <>
      {/* <Recipent_Dashboard/> */}
      {/* <DonorDashboard/> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<DonorDashboard />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          {/* <Route path="/" element={<DonorDashboard />} /> */}
          <Route path="/" element={<Recipent_Dashboard />} />
          <Route path="/feed" element={<GeneralFeed />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
