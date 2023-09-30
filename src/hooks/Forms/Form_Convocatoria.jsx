import { useState } from "react";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const Form_Convocatoria = ({ onClose, edit }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    sis: "",
    phone: "",
    facultad: "",
    carrera: "",
    cargo: "",
  });

  const [carreras, setCarreras] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFacultadChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value === "Option1") {
      setCarreras(["Veterinaria "]);
    } else if (value === "Option2") {
      setCarreras([
        "Ing. Sistemas",
        "Ing. Electronica",
        "Ing. Eletrica",
        "Ing. Civil",
        "Ing. Industrial",
      ]);
    } else {
      setCarreras([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Tu lógica de manejo de envío de datos aquí

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
              label="Nombre Encargado"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="dense"
            />
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateRangePicker"]}>
                <DateRangePicker
                  localeText={{ start: "Fecha inicio", end: "Fecha fin" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>

          <Box sx={{ mt: 2, marginBottom: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="facultad">Facultad</InputLabel>
              <Select
                required
                label="Facultad"
                name="facultad"
                value={formData.facultad}
                onChange={handleFacultadChange}
                inputProps={{
                  name: "facultad",
                  id: "facultad",
                }}
              >
                <MenuItem value="Option1">Facultad de veterinaria</MenuItem>
                <MenuItem value="Option2">
                  Facultad de Ciencias y tecnologia
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2, marginBottom: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="carrera">Carrera</InputLabel>
              <Select
                required
                label="Carrera"
                name="carrera"
                value={formData.carrera}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    carrera: e.target.value,
                  });
                }}
                inputProps={{
                  name: "carrera",
                  id: "carrera",
                }}
              >
                {carreras.map((carrera, index) => (
                  <MenuItem key={index} value={carrera}>
                    {carrera}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </FormControl>

        <Box sx={{ mt: 2, marginBottom: 2 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="tipo_eleccion">Tipo eleccion</InputLabel>
            <Select
              required
              label="tipo_eleccion"
              name="tipo_eleccion"
              value={formData.tipo_eleccion}
              onChange={handleChange}
              inputProps={{
                name: "tipo_eleccion",
                id: "tipo_eleccion",
              }}
            >
              <MenuItem value="Option1">Rector</MenuItem>
              <MenuItem value="Option2">Decano</MenuItem>
              <MenuItem value="Option3">HCF</MenuItem>
              <MenuItem value="Option4">HCU</MenuItem>
            </Select>
          </FormControl>
        </Box>

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
            {edit ? "Editar Convocatoria" : "Crear Convocatoria"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form_Convocatoria;

Form_Convocatoria.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object,
  edit: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired,
};
