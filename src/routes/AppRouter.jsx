import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeClient from "../pages/Client/Home/Home";
import Frente_Candidatos_Eleccion from "../pages/Admin/Asociacion/Frente_Candidatos_Eleccion";
import HomeAdmin from "../pages/Admin/Home/Home";

import Login from "../auth/Login";
import Cookies from "js-cookie";
export const AppRouter = () => {
  const authToken = Cookies.get("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeClient />} />
        <Route
          path="/login"
          element={authToken ? <Navigate to="/admin" /> : <Login />}
        />
        <Route path="/Admin" element={<HomeAdmin />} />
        <Route
          path="/Admin/Frente_Eleccion"
          element={<Frente_Candidatos_Eleccion />}
        />
      </Routes>
    </Router>
  );
};
