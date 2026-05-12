import React from "react";
import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import Process from "../components/Process.jsx";
import Privacy from "../components/Privacy.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import Chatbot from "../components/Chatbot.jsx";

export default function Landing() {
  return (
    <div className="relative min-h-screen text-white grain" data-testid="landing-page">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Process />
        <Privacy />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
