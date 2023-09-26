import List from "@mui/material/List";

import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { iconsList } from "./items/IconsList";

import { Drawer } from "../layout/admin/AdminComponents";
import { CustomListItem } from "./items/CustomListItem";
const NavBar = ({ open, mode }) => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const backgroundDia = {
    background: "#FCFCFC",
    color: "black",
  };
  const backgroundNoche = {
    background: "#242526",
    color: "white",
  };
  const handleLinkClick = (event) => {
    // Evitar que el cajón se cierre
    event.stopPropagation();
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          ...(mode ? backgroundDia : backgroundNoche),
        },
      }}
    >
      <DrawerHeader>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flex: 1, // Ocupa el espacio disponible
          }}
        >
          <img
            src="https://www.umss.edu.bo/wp-content/uploads/2018/01/logo-fcyt.png"
            alt="Logo"
            style={{
              width: open ? "50%" : "50%", // Cambia el tamaño de la imagen aquí
              height: "auto",
              opacity: open ? 1 : 0.5, // Cambia la opacidad de la imagen según el valor de open
              transition: "opacity 0.3s ease-in-out", // Agrega una transición suave a la opacidad
              padding: "5px",
            }}
          />
        </Box>
      </DrawerHeader>

      <Divider />

      <List>
        <CustomListItem
          to="/Admin"
          text="Inicio"
          icon={iconsList["Inicio"]}
          onClick={handleLinkClick}
        />
        <Divider />

        <CustomListItem
          to="/Admin/Frente_Eleccion"
          text="Frente Eleccion"
          icon={<LocalMallIcon />}
          onClick={handleLinkClick}
        />
      </List>
    </Drawer>
  );
};
NavBar.propTypes = {
  open: PropTypes.bool.isRequired,

  mode: PropTypes.bool.isRequired,
};
export default NavBar;
