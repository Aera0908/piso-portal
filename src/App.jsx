import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import TermsAndConditions from "./components/TermsAndConditions"; // Import Terms and Conditions page
import PrivacyPolicy from "./components/PrivacyPolicy"; // Import Privacy Policy page
import Help from "./components/Help"; // Import Help page
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components

function App() {
  return (
    <Router>
      <div className="border-x-1 border-[#e6e6e6] shadow-[0px_4px_16px_0px_rgba(0,_0,_0,_0.1)]">
        <Header />
        <Banner />
        <Routes>
          <Route path="/" element={<Content />} /> {/* Main Content */}
          <Route path="/terms" element={<TermsAndConditions />} />{" "}
          {/* Terms and Conditions */}
          <Route path="/privacy" element={<PrivacyPolicy />} />{" "}
          {/* Privacy Policy */}
          <Route path="/help" element={<Help />} /> {/* Help Page */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
