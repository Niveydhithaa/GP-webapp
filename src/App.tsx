import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import DashboardV2 from "pages/AddSympDashboard";
import AccordionExample from "components/AccordionExample";
import Patients from "pages/patients/Patients"
import PatientProfile from "pages/patients/PatientProfile"
import Home from "pages/Homepage"
import AboutGP from "pages/AboutGP"
import CustomBreadCrumb from "components/CustomBreadCrumb"
import TwoStepBreadCrumb from "components/TwoStepBreadCrumb"
import Accounts from "pages/Accounts"
import Analytics from "pages/Analytics"
import MainPage from "components/charts/MainPage";
import PrivateRoute from "hooks/PrivateRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard></Dashboard>}/> */}
        <Route path="/dashboard_v2" element={<DashboardV2 />} />
        {/* <Route path="/patientslist" element={<Patients />} /> */}
        {/* <Route path="/patientprofile" element={<PatientProfile />} /> */}
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/breads" element={<CustomBreadCrumb />} />
        <Route path="/twostepbread" element={<TwoStepBreadCrumb />} />
        <Route path="/aboutgp" element={<AboutGP />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/main" element={<MainPage />} />

        <Route path='/home' element={<PrivateRoute component={Home} />} />
        <Route path='/patientprofile' element={<PrivateRoute component={PatientProfile} />} />
        <Route path='/patientslist' element={<PrivateRoute component={Patients} />} />
        <Route path='/dashboard' element={<PrivateRoute component={Dashboard} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
