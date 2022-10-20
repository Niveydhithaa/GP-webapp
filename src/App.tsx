import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import DashboardV2 from "pages/Dashboard copy";
import AccordionExample from "components/AccordionExample";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard_v2" element={<DashboardV2 />} />
        <Route path="/accordion_reusable" element={<AccordionExample />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
