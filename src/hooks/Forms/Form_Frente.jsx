import { useState } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";

const Form_Frente = ({ onClose, edit, onNuevoClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    sis: "",
    phone: "",
    facultad: "",
    carrera: "",
    cargo: "",
    jurados: [], // Agregamos un campo para los jurados seleccionados
  });

  const [carreras, setCarreras] = useState([]);
  const [selectedJurados, setSelectedJurados] = useState(new Set()); // Mantenemos un conjunto de jurados seleccionados

  const handleNuevoClick = (itemName) => {
    onNuevoClick(itemName);
  };

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
      setCarreras(["Veterinaria"]);
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

  const handleJuradoSelect = (jurado) => {
    setSelectedJurados((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.add(jurado);
      return newSelected;
    });
  };

  const handleJuradoDeselect = (jurado) => {
    setSelectedJurados((prevSelected) => {
      const newSelected = new Set(prevSelected);
      newSelected.delete(jurado);
      return newSelected;
    });
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
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "95vh",
          }}
        >
          <CssBaseline />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
                      <MenuItem value="Option1">
                        Facultad de veterinaria
                      </MenuItem>
                      <MenuItem value="Option2">
                        Facultad de Ciencias y tecnologia
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                    onClick={() => handleNuevoClick("facultad")}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                    onClick={() => handleNuevoClick("carrera")}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="jurados">Jurados</InputLabel>
                    <Select
                      required
                      label="Jurados"
                      name="jurados"
                      value={formData.jurados}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          jurados: e.target.value,
                        });
                      }}
                      inputProps={{
                        name: "jurados",
                        id: "jurados",
                      }}
                      multiple // Esto permite la selección múltiple
                    >
                      {juradosDisponibles.map((jurado, index) => (
                        <MenuItem
                          key={index}
                          value={jurado}
                          onClick={() => {
                            if (selectedJurados.has(jurado)) {
                              handleJuradoDeselect(jurado);
                            } else {
                              handleJuradoSelect(jurado);
                            }
                          }}
                        >
                          {jurado}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                    onClick={() => handleNuevoClick("jurados")}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {/* Muestra los jurados seleccionados */}
            {Array.from(selectedJurados).map((jurado, index) => (
              <span key={index}>{jurado}</span>
            ))}

            <Button
              type="submit"
              sx={{
                width: "100%",
                borderRadius: "55px",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.9)",
                mt: 2,
              }}
              variant="contained"
              color="primary"
            >
              {edit ? "Editar Usuario" : "Crear Eleccion"}
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Form_Frente;

Form_Frente.propTypes = {
  onClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  onNuevoClick: PropTypes.func.isRequired,
};
