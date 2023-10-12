import { useState } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
} from "@mui/material";

const Form_Eleccion = ({ edit, function_add }) => {
  const [mesas, setMesas] = useState([]);
  const [cantidadMesas, setCantidadMesas] = useState(1);
  const [formData, setFormData] = useState({
    facultad: "",
    carrera: "",
  });

  const docentes = [
    {id: "1", nombre: "JUAN ANTONIO", cargo: "RODRIGUEZ SEJAS",},
    {id: "2", nombre: "MARLENE", cargo: "UGARTE GALARZA",},
    {id: "3", nombre: "JOSE ROBERTO", cargo: "OMONTE OJALVO",},
    {id: "4", nombre: "DAVID ALFREDO", cargo: "DELGADILLO COSSIO",},
    {id: "5", nombre: "RAMIRO", cargo: "ROJAS ZURITA",},
    {id: "6", nombre: "LUCIO", cargo: "GONZALES CARTAGENA",},
    {id: "7", nombre: "MARIEL ANGELES", cargo: "MENDEZ LOZA",},
    {id: "8", nombre: "JULIO", cargo: "MEDINA GAMBOA",},
    {id: "9", nombre: "JULIO", cargo: "AMEDINA GAMBOA",},
    {id: "10", nombre: "GUALBERTO", cargo: "CLEON ROMERO",},
    {id: "11", nombre: "JUAN PABLO", cargo: "PENALOZA PACHECO",},
    {id: "12", nombre: "GUALBERTO", cargo: "LEON ROMERO",},
    {id: "13", nombre: "RONALD EDGAR", cargo: "PATINO TITO",},
    {id: "14", nombre: "BTICLLA MAMANI IVAN", cargo: "Docente",},
    {id: "15", nombre: "FIDEL", cargo: "TABORGA ACHA",},
    {id: "16", nombre: "MARIA BETHY", cargo: "LOVERA MAMANI",},
  ];

  const estudiantes = [
    { id: "1", nombre: "LEON ROMERO GUALBERTO", cargo: "Estudiante",},
    { id: "2", nombre: "JUAN ANTONIO", cargo: "FRODRIGUEZ SEJAS",},
    { id: "3", nombre: "MICHAEL HUASCAR", cargo: "VASQUEZ CARRILLO",},
    { id: "4", nombre: "JORGE", cargo: "DAVALOS BROZOVIC",},
    { id: "5", nombre: "ROCIO", cargo: "GUZMAN SAAVEDRA",},
    { id: "6", nombre: "MICHAEL HUASCAR", cargo: "VASQUEZ CARRILLO",},
    { id: "7", nombre: "MIGUEL ANGEL", cargo: "ORDONEZ SALVATIERRA",},
    { id: "8", nombre: "RENE", cargo: "MOREIRA CALIZAYA",},
    { id: "9", nombre: "ROCIO", cargo: "GUZMAN SAAVEDRA",},
    { id: "10", nombre: "JUAN CARLOS", cargo: "TERRAZAS VARGAS",},
    { id: "11", nombre: "FELIX", cargo: "UGARTE CEJAS",},
    { id: "12", nombre: "IVAN", cargo: "FUENTES MIRANDA",},
    { id: "13", nombre: "CECILIA BEATRIZ", cargo: "CASTRO LAZARTE",},
    { id: "14", nombre: "RENE", cargo: "OREIRA CALIZAYA",},
    { id: "15", nombre: "JUAN CARLOS", cargo: "TERRAZAS VARGAS",},
    { id: "16", nombre: "GALINA", cargo: "SHITIKOV GAGARINA",},
  ];

  const handleCreateMesas = () => {
    const numMesas = cantidadMesas;
    const nuevasMesas = [];
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numMesas === 1) {
      nuevasMesas.push({
        id: 1,
        nombre: `Mesa 1`,
        rango: "A-Z",
        jurado: [],
      });
    } else if (numMesas > 1) {
      const letrasPorMesa = Math.ceil(letras.length / numMesas);

      for (let i = 0; i < numMesas; i++) {
        const rangoInicial = letras[i * letrasPorMesa];
        const rangoFinal =
          letras[(i + 1) * letrasPorMesa - 1] || letras[letras.length - 1];

        nuevasMesas.push({
          id: i + 1,
          nombre: `Mesa ${i + 1}`,
          rango: `${rangoInicial}-${rangoFinal}`,
          jurado: [],
        });
      }
    }

    asignarJurados(nuevasMesas);
  };

  function obtenerNombresJurados(list_mesas){
    const nombresJurados = list_mesas.flatMap((mesa) =>
      mesa.jurado.map((jurado) => `${jurado.nombre} ${jurado.cargo}`)
    );
    return(nombresJurados);
  }

  const asignarJurados = (nuevasMesas) => {
    const docentesCopy = [...docentes];
    const estudiantesCopy = [...estudiantes];

    const mesasConJurados = nuevasMesas.map((mesa) => {
      const juradosMesa = [];

      for (let i = 0; i < 2; i++) {
        if(i < 1){
          const randomIndex = Math.floor(Math.random() * docentesCopy.length);
          const docente = docentesCopy.splice(randomIndex, 1)[0];
          juradosMesa.push(docente);
        }else{
          const randomIndex = Math.floor(Math.random() * estudiantesCopy.length);
          const estudiante = estudiantesCopy.splice(randomIndex, 1)[0];
          juradosMesa.push(estudiante);
        }
      }

      return {
        ...mesa,
        jurado: juradosMesa,
      };
    });
    setMesas(mesasConJurados);
    console.log('Mesas jurado => ', mesasConJurados, 'Jurados => ', obtenerNombresJurados(mesasConJurados));
    console.log('Datos de formData => ', formData);
    const nombresjurados = obtenerNombresJurados(mesasConJurados);
    console.log(nombresjurados);
    function_add(formData, nombresjurados);
  };

  const handleCantidadMesasChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    setCantidadMesas(selectedValue);
  };

  const [carreras, setCarreras] = useState([]);

  const handleFacultadChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value === "Facultad de veterinaria") {
      setCarreras(["Veterinaria "]);
    } else if (value === "Facultad de Ciencias y Tecnologia") {
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

  const obtenerRango = (mesa) => {
    return mesa.rango;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a payload with the data you want to send
      const payload = {
        cantidadMesas: cantidadMesas,
        juradoSeleccionado: formData.jurado, // Include the selected jurado data
        mesas: mesas, // Include the 'mesas' data
      };

      // Make a POST request to the backend API
      // const response = await fetch(apiUrl, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(payload),
      // });
      console.log(payload);
      // if (response.ok) {
      //   // Handle success, e.g., display a success message or redirect to another page
      //   console.log("Data sent successfully");
      //   onClose(); // Close the form or perform other actions as needed
      // } else {
      //   // Handle errors, e.g., show an error message
      //   console.error("Error sending data to API:", response.statusText);
      // }
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
                    <MenuItem value="Facultad de veterinaria">
                      Facultad de veterinaria
                    </MenuItem>
                    <MenuItem value="Facultad de Ciencias y Tecnologia">
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="cantidadMesas">
                      Cantidad de Mesas
                    </InputLabel>
                    <Select
                      required
                      label="Cantidad de Mesas"
                      name="cantidadMesas"
                      value={cantidadMesas}
                      onChange={handleCantidadMesasChange}
                      inputProps={{
                        name: "cantidadMesas",
                        id: "cantidadMesas",
                      }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                    onClick={handleCreateMesas}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre de la Mesa</TableCell>
                    <TableCell>Rango</TableCell>
                    <TableCell>Jurado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mesas.map((mesa) => (
                    <TableRow key={mesa.id}>
                      <TableCell>{mesa.id}</TableCell>
                      <TableCell>{mesa.nombre}</TableCell>
                      <TableCell>{obtenerRango(mesa)}</TableCell>
                      <TableCell>
                        <CollapsibleTable jurados={mesa.jurado} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
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
              {edit ? "Editar Usuario" : "Crear Elección"}
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

const CollapsibleTable = ({ jurados }) => {
  const [open, setOpen] = useState(false);

  const handleCollapseClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button onClick={handleCollapseClick} sx={{ textTransform: "none" }}>
        {open ? "Ocultar Jurados" : `Mostrar Jurados (${jurados.length})`}
      </Button>
      <Collapse in={open}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Cargo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jurados.map((jurado, index) => (
              <TableRow key={index}>
                <TableCell>{jurado.nombre}</TableCell>
                <TableCell>{jurado.cargo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Collapse>
    </div>
  );
};

export default Form_Eleccion;

Form_Eleccion.propTypes = {
  edit: PropTypes.bool.isRequired,
  function_add: PropTypes.func.isRequired,
};
