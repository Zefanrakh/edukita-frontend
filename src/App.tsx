import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Assignment from "./pages/Assignment";
import MainLayout from "./components/MainLayout";
import Grade from "./pages/Grade";

function App() {
  /* --------------------- RENDER --------------------- */

  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/grade" element={<Grade />} />
          </Route>

          <Route path="*" element={<Navigate to="/assignment" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
