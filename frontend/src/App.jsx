import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Upload from "./components/Upload";
import Profile from "./components/Profile";
import CarDetailPage from "./components/CarDetailPage";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //     navigate("/dashboard");
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [navigate]); // Dependency array now includes `navigate`

  return (
    <div className="w-screen h-screen bg-slate-700 flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
         
        <Route path="/car-details/:id"  element={<CarDetailPage />} />
        



        <Route
          path="/dashboard"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/upload"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Upload />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
