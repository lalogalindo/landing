import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { I18nProvider } from "@/i18n/index.jsx";
import Landing from "@/pages/Landing.jsx";

function App() {
  return (
    <I18nProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
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
