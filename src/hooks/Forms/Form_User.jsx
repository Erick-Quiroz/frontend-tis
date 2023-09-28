import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  TextField,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Box, Button } from "@mui/material";
import { postProduct, putApi } from "../../api/api";
import { Success } from "../Alerts/Success";
import { Danger } from "../Alerts/Danger";

const Form_User = ({ onClose, selectedProduct, edit, getProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    sis: "",
    phone: "",
    facultad: "",
    cargo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (edit) {
        await putApi(selectedProduct.id, formData);
      } else {
        // await postProduct(formData);
        console.log(formData);
      }

      if (getProduct) {
        getProduct();
      }

      onClose();
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <CssBaseline />

      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            width: 320,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Nombre"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 0 }}>
            <TextField
              required
              label="Apellidos"
              variant="outlined"
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              required
              label="Codigo Sis"
              variant="outlined"
              fullWidth
              name="sis"
              value={formData.sis}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2, marginBottom: 2 }}>
            <TextField
              required
              label="Telefono/Celular"
              variant="outlined"
              fullWidth
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2, marginBottom: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="cargo">Facultad</InputLabel>
              <Select
                required
                label="Facultad"
                name="facultad"
                value={formData.facultad}
                onChange={handleChange}
                inputProps={{
                  name: "facultad",
                  id: "facultad",
                }}
              >
                <MenuItem value="Option1">Facultad de veterinaria</MenuItem>
                <MenuItem value="Option2">
                  Facultad de Ciencias y tecnologia
                </MenuItem>
                <MenuItem value="Option3">Facultad de Humanidades</MenuItem>
                <MenuItem value="Option4">Facultad de Derecho</MenuItem>
                <MenuItem value="Option5">Facultad de Medicina</MenuItem>
                <MenuItem value="Option6">Facultad de Arquitectura</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2, marginBottom: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="cargo">Cargo</InputLabel>
              <Select
                required
                label="Cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                inputProps={{
                  name: "cargo",
                  id: "cargo",
                }}
              >
                <MenuItem value="Option1">Estudiante</MenuItem>
                <MenuItem value="Option2">Docente</MenuItem>
                <MenuItem value="Option3">otro</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
          </Box>
        </FormControl>

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            sx={{
              width: "100%",
              borderRadius: "55px",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.9)",
            }}
            variant="solid"
            color="primary"
          >
            {edit ? "Editar Usuario" : "Crear Usuario"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form_User;

Form_User.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object,
  edit: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired,
};
