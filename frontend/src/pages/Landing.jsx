import React from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Process from "../components/Process";
import Privacy from "../components/Privacy";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

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
    </div>
  );
}
