import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import DashboardV2 from "pages/Dashboard copy";
import AccordionExample from "components/AccordionExample";
import Patients from "pages/patients/Patients"
import PatientProfile from "pages/patients/PatientProfile"
import Home from "pages/Homepage"
import CustomBreadCrumb from "components/CustomBreadCrumb"
import TwoStepBreadCrumb from "components/TwoStepBreadCrumb"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard_v2" element={<DashboardV2 />} />
        <Route path="/accordion_reusable" element={<AccordionExample />} />
        <Route path="/patientslist" element={<Patients />} />
        <Route path="/patientprofile" element={<PatientProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/breads" element={<CustomBreadCrumb />} />
        <Route path="/twostepbread" element={<TwoStepBreadCrumb />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
