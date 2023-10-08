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
import Page_Eleccion from "../pages/Admin/Eleccion/Page";
import Create_Eleccion from "../pages/Admin/Eleccion/Sub/Create_Eleccion";
import Page_Frente from "../pages/Admin/Frente/Page";
import Page_Cargo from "../pages/Admin/Cargo/Page";
import Page_Mesa from "../pages/Admin/Mesas/Page";
import Page_Jurado from "../pages/Admin/Jurados/Page";
import Page_Asociacion from "../pages/Admin/Asociacion/Frente_Candidatos_Eleccion";
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
        <Route path="/admin/eleccion" element={<Page_Eleccion />} />

        <Route path="/admin/eleccion/create" element={<Create_Eleccion />} />
        <Route
          path="/admin/Frente_Eleccion"
          element={<Frente_Candidatos_Eleccion />}
        />
        <Route path="/admin/facultad" element={<Page_Facultad />} />
        <Route path="/admin/carrera" element={<Page_Carrera />} />
        <Route path="/admin/convocatoria" element={<Convocatoria />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/user" element={<Create_User />} />
        <Route path="/admin/frente" element={<Page_Frente />} />
        <Route path="/admin/cargo" element={<Page_Cargo />} />
        <Route path="/admin/mesas" element={<Page_Mesa />} />
        <Route path="/admin/jurado" element={<Page_Jurado />} />
        <Route path="/admin/asociar" element={<Page_Asociacion />} />
      </Routes>
    </Router>
  );
};
