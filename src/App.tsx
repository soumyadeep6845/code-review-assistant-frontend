import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CodeReview from "./pages/CodeReview";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import ProtectedRoute from "./utils/ProtectedRoute";
import About from "./pages/About";
import Contact from "./pages/Contact"


function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Authentication Route */}
        <Route path="/auth" element={isAuthenticated ? <Navigate to="/" replace /> : <Auth />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<CodeReview />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Default Redirect for Unmatched Routes */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
