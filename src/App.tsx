import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CodeReview from "./pages/CodeReview";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Route for Authentication */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes (only accessible if logged in) */}
          <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<CodeReview />} />
        </Route>

        {/* Catch-all for invalid URLs */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
