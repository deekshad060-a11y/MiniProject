import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordPage from "./Landingpage";
import HeroSection from "./HeroSection";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default page → Password screen */}
        <Route path="/" element={<PasswordPage />} />

        {/* After correct password → HeroSection */}
        <Route path="/home" element={<HeroSection />} />
      </Routes>
    </Router>
  );
}

export default App;
