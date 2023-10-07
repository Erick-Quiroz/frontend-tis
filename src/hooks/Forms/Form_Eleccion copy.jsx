import { useState } from "react";
import PropTypes from "prop-types";
import Autocomplete from "@mui/material/Autocomplete";

import {
  FormControl,
  TextField,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";

const Form_Eleccion = ({ onClose, edit, onNuevoClick }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    sis: "",
    phone: "",
    facultad: "",
    carrera: "",
    cargo: "",
  });
  const handleNuevoClick = (itemName) => {
    onNuevoClick(itemName);
  };
  const [carreras, setCarreras] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [roles, setRoles] = useState([]);
  const [nuevoCandidato, setNuevoCandidato] = useState("");
  const [nuevoRol, setNuevoRol] = useState("");

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

  const handleAddCandidato = () => {
    if (nuevoCandidato.trim() !== "" && nuevoRol.trim() !== "") {
      setCandidatos([...candidatos, nuevoCandidato]);
      setRoles([...roles, nuevoRol]);
      setNuevoCandidato("");
      setNuevoRol("");
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
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="tipo_eleccion">
                      Tipo eleccion
                    </InputLabel>
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
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={6}>
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

              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="facultad">Carrera</InputLabel>
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
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Autocomplete
                    options={[
                      { label: "Rector", value: "Option1" },
                      { label: "Sub Rector", value: "Option2" },
                      { label: "Asesor", value: "Option3" },
                      { label: "otro", value: "Option4" },
                    ]}
                    getOptionLabel={(option) => option.label}
                    fullWidth
                    value={null}
                    onChange={(e, newValue) => {
                      setNuevoRol(newValue ? newValue.label : "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Rol del Candidato"
                        required
                        variant="outlined"
                        name="rolCandidato"
                        value={nuevoRol}
                        onChange={(e) => setNuevoRol(e.target.value)}
                      />
                    )}
                  />
                  <Autocomplete
                    options={[
                      { label: "Erick", value: "Rector" },
                      { label: "Alendro 2", value: "Sub Rector" },
                      { label: "Carlos 3", value: "Rector" },
                      { label: "Juana", value: "Sub Rector" },
                    ]}
                    getOptionLabel={(option) => option.label}
                    fullWidth
                    value={null}
                    onChange={(e, newValue) => {
                      setNuevoCandidato(newValue ? newValue.label : "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Candidato"
                        required
                        variant="outlined"
                        name="candidato"
                        value={nuevoCandidato}
                        onChange={(e) => setNuevoCandidato(e.target.value)}
                      />
                    )}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                    onClick={handleAddCandidato}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#FFFCF5" }}>
                        <TableCell>Candidato</TableCell>
                        <TableCell>Rol</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {candidatos.map((candidato, index) => (
                        <TableRow key={index}>
                          <TableCell>{candidato}</TableCell>
                          <TableCell>{roles[index]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            </Grid>

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

export default Form_Eleccion;

Form_Eleccion.propTypes = {
  onClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  onNuevoClick: PropTypes.func.isRequired,
};
