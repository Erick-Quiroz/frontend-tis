import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeClient from "../pages/Client/Home/Home";
import Frente_Candidatos_Eleccion from "../pages/Admin/Asociacion/Frente_Candidatos_Eleccion";
import HomeAdmin from "../pages/Admin/Home/Page";

import Login from "../auth/Login";
import Cookies from "js-cookie";
import Create_User from "../pages/Admin/User/Page";
import Page_Facultad from "../pages/Admin/Facultad/page";
import Page_Carrera from "../pages/Admin/Carrera/Page";
import Convocatoria from "../pages/Admin/Convocatoria/Page";
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

        <Route
          path="/admin/Frente_Eleccion"
          element={<Frente_Candidatos_Eleccion />}
        />
        <Route path="/admin/facultad" element={<Page_Facultad />} />
        <Route path="/admin/carrera" element={<Page_Carrera />} />
        <Route path="/admin/convocatoria" element={<Convocatoria />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/user" element={<Create_User />} />
      </Routes>
    </Router>
  );
};
