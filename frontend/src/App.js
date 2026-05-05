import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { I18nProvider } from "@/i18n";
import Landing from "@/pages/Landing";

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
          theme="dark"
          richColors
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(10, 11, 20, 0.95)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "#fff",
              backdropFilter: "blur(16px)",
            },
          }}
        />
      </div>
    </I18nProvider>
  );
}

export default App;
