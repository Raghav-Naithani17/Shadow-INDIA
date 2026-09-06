import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ReportDetails from "./pages/ReportDetails";

function App() {
  return (
    <Routes>

      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Report Details Page */}
      <Route
        path="/reports/:id"
        element={<ReportDetails />}
      />

      {/* Admin Page */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;