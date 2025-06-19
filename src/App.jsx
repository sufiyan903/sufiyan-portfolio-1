import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { About, Skills, Projects, Experience, Certifications, Contact } from "./components";
import Education from "./components/Education";  // Import Education
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <Hero />
      <About />
      <Education />       {/* Education section */}
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
