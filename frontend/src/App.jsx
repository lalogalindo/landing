import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { I18nProvider } from "@/i18n/index.jsx";
import ScrollToTop from "@/components/ScrollToTop.jsx";
import Landing from "@/pages/Landing.jsx";
import About from "@/pages/About.jsx";
import BusinessCard from "@/pages/BusinessCard.jsx";
import NotFound from "@/pages/NotFound.jsx";
import { getTeamMember } from "@/config/team.js";

function App() {
  return (
    <I18nProvider>
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/egalindo"
              element={<BusinessCard member={getTeamMember("egalindo")} />}
            />
            <Route
              path="/mromero"
              element={<BusinessCard member={getTeamMember("mromero")} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          theme="light"
          richColors
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-1)",
              boxShadow: "var(--shadow-card-hover)",
            },
          }}
        />
      </div>
    </I18nProvider>
  );
}

export default App;
