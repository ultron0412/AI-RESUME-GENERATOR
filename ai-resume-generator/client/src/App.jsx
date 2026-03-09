import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Templates from "./pages/Templates";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e1e2e",
            color: "#f0f0f5",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            fontSize: "14px",
            fontFamily: "'Inter', sans-serif",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
          },
        }}
      />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
