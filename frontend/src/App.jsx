import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  matchPath,
} from "react-router-dom";

// Navbar and Footer components
import Navbar from "./utils/navbar";
import Footerm from "./utils/Footerm";
import SideItemBar from "./utils/sideItemBar";

// Pages
import Home from "./pages/home";
import Login from "./pages/login"; // Importing the login page
import Register from "./pages/register"; // Importing the register page
import Profile from "./pages/Profile"; // Importing the profile page
import DisplayAppointments from "./pages/displayAppointments";
import PaymentProcess from "./pages/paymentProcess";
import AddDoctor from "./pages/AddDoctor";
import DoctorList from "./pages/DoctorList";
import AddMedicalReportForm from "./pages/AddMedicalReportForm";
import AddedReports from "./pages/AddedReports";
import ReportDetails from "./pages/ReportDetails";
import MedicalReportsDisplay from "./pages/medicalReportsDisplay";
import Appointment from "./pages/Appointment";

// Loading component
import Loading from "./utils/loading";

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  // Paths where Navbar and Footer should not appear
  const excludeNavbarFooter = [
    "/",
    "/register",
    "/addDoctor",
    "/view-doctors",
    "/add-report",
    "/addedReports",
    "/report/:id",
  ];

  // Paths where SideItemBar should not appear (including Appointment route)
  const excludeSideItemBar = [
    "/Appointment",
    "/",
    "/register",
    "/addDoctor",
    "/view-doctors",
    "/add-report",
    "/addedReports",
    "/report/:id", // Exclude SideItemBar from Appointment page
  ];

  // Paths where loading screen should not appear
  const noLoadingPaths = [
    "/addDoctor",
    "/view-doctors",
    "/add-report",
    "/addedReports",
    "/report/:id",
  ];

  // Check if the current path is in the list of paths where loading should not appear
  const isNoLoadingPath = noLoadingPaths.some((path) =>
    matchPath(path, location.pathname)
  );

  useEffect(() => {
    if (!isNoLoadingPath) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [location, isNoLoadingPath]);

  return (
    <div className="relative flex-col min-h-screen overflow-hidden lgs:items-center">
      {/* Conditionally render Navbar based on the current path */}
      {!excludeNavbarFooter.includes(location.pathname) && <Navbar />}

      <div className="flex-grow">
        {isLoading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} /> {/* Login route */}
            <Route path="/register" element={<Register />} />{" "}
            {/* Register route */}
            <Route path="/profile" element={<Profile />} />{" "}
            {/* Profile route */}
            <Route path="/payment" element={<DisplayAppointments />} />
            <Route path="/payment-process" element={<PaymentProcess />} />
            <Route path="/medical-report" element={<MedicalReportsDisplay />} />
            <Route path="/addDoctor" element={<AddDoctor />} />
            <Route path="/view-doctors" element={<DoctorList />} />
            <Route path="/add-report" element={<AddMedicalReportForm />} />
            <Route path="/addedReports" element={<AddedReports />} />
            <Route path="/report/:id" element={<ReportDetails />} />
            <Route path="/Appointment" element={<Appointment />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>

      {/* Conditionally render SideItemBar based on the current path and isLoading state */}
      {!excludeSideItemBar.includes(location.pathname) && !isLoading && (
        <div className="hidden lgs:flex mds:flex items-center justify-center">
          <SideItemBar />
        </div>
      )}

      {/* Conditionally render Footer based on the current path */}
      {!excludeNavbarFooter.includes(location.pathname) && (
        <div className="hidden sms:flex">
          <Footerm />
        </div>
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
