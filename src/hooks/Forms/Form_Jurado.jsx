import { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const docentes = [
  {
    id: "1",
    nombre: "Erick1",
    cargo: "Docente",
  },
  {
    id: "2",
    nombre: "Erick2",
    cargo: "Docente",
  },
  {
    id: "3",
    nombre: "Erick3",
    cargo: "Docente",
  },
  {
    id: "4",
    nombre: "Erick4",
    cargo: "Docente",
  },
  {
    id: "5",
    nombre: "Erick5",
    cargo: "Docente",
  },
  {
    id: "6",
    nombre: "Erick6",
    cargo: "Docente",
  },
  {
    id: "7",
    nombre: "Erick7",
    cargo: "Docente",
  },
  {
    id: "8",
    nombre: "Erick8",
    cargo: "Docente",
  },
  {
    id: "9",
    nombre: "Erick9",
    cargo: "Docente",
  },
  {
    id: "10",
    nombre: "Erick10",
    cargo: "Docente",
  },
  {
    id: "11",
    nombre: "Erick11",
    cargo: "Docente",
  },
  {
    id: "12",
    nombre: "Erick12",
    cargo: "Docente",
  },
  {
    id: "13",
    nombre: "Erick13",
    cargo: "Docente",
  },
  {
    id: "14",
    nombre: "Erick14",
    cargo: "Docente",
  },
  {
    id: "15",
    nombre: "Erick15",
    cargo: "Docente",
  },
  {
    id: "16",
    nombre: "Erick16",
    cargo: "Docente",
  },
  {
    id: "17",
    nombre: "Erick17",
    cargo: "Docente",
  },
  {
    id: "18",
    nombre: "Erick18",
    cargo: "Docente",
  },
  {
    id: "19",
    nombre: "Erick19",
    cargo: "Docente",
  },
  {
    id: "20",
    nombre: "Erick20",
    cargo: "Docente",
  },
  {
    id: "21",
    nombre: "Erick21",
    cargo: "Docente",
  },
  {
    id: "22",
    nombre: "Erick22",
    cargo: "Docente",
  },
  {
    id: "23",
    nombre: "Erick23",
    cargo: "Docente",
  },
  {
    id: "24",
    nombre: "Erick24",
    cargo: "Docente",
  },
  {
    id: "25",
    nombre: "Erick25",
    cargo: "Docente",
  },
  {
    id: "26",
    nombre: "Erick26",
    cargo: "Docente",
  },
  {
    id: "27",
    nombre: "Erick27",
    cargo: "Docente",
  },
  {
    id: "28",
    nombre: "Erick28",
    cargo: "Docente",
  },
  {
    id: "29",
    nombre: "Erick29",
    cargo: "Docente",
  },
  {
    id: "30",
    nombre: "Erick30",
    cargo: "Docente",
  },
];

const estudiantes = [
  {
    id: "1",
    nombre: "Alejandro1",
    cargo: "Estudiante",
  },
  {
    id: "2",
    nombre: "Alejandro2",
    cargo: "Estudiante",
  },
  {
    id: "3",
    nombre: "Alejandro3",
    cargo: "Estudiante",
  },
  {
    id: "4",
    nombre: "Alejandro4",
    cargo: "Estudiante",
  },
  {
    id: "5",
    nombre: "Aleatorio1",
    cargo: "Estudiante",
  },
  {
    id: "6",
    nombre: "Aleatorio2",
    cargo: "Estudiante",
  },
  {
    id: "7",
    nombre: "Aleatorio3",
    cargo: "Estudiante",
  },
  {
    id: "8",
    nombre: "Aleatorio4",
    cargo: "Estudiante",
  },
  {
    id: "9",
    nombre: "Aleatorio5",
    cargo: "Estudiante",
  },
  {
    id: "10",
    nombre: "Aleatorio6",
    cargo: "Estudiante",
  },
  {
    id: "11",
    nombre: "Aleatorio7",
    cargo: "Estudiante",
  },
  {
    id: "12",
    nombre: "Aleatorio8",
    cargo: "Estudiante",
  },
  {
    id: "13",
    nombre: "Aleatorio9",
    cargo: "Estudiante",
  },
  {
    id: "14",
    nombre: "Aleatorio10",
    cargo: "Estudiante",
  },
  {
    id: "15",
    nombre: "Aleatorio11",
    cargo: "Estudiante",
  },
  {
    id: "16",
    nombre: "Aleatorio12",
    cargo: "Estudiante",
  },
  {
    id: "17",
    nombre: "Aleatorio13",
    cargo: "Estudiante",
  },
  {
    id: "18",
    nombre: "Aleatorio14",
    cargo: "Estudiante",
  },
  {
    id: "19",
    nombre: "Aleatorio15",
    cargo: "Estudiante",
  },
  {
    id: "20",
    nombre: "Aleatorio16",
    cargo: "Estudiante",
  },
  {
    id: "21",
    nombre: "Aleatorio17",
    cargo: "Estudiante",
  },
  {
    id: "22",
    nombre: "Aleatorio18",
    cargo: "Estudiante",
  },
  {
    id: "23",
    nombre: "Aleatorio19",
    cargo: "Estudiante",
  },
  {
    id: "24",
    nombre: "Aleatorio20",
    cargo: "Estudiante",
  },
  {
    id: "25",
    nombre: "Aleatorio21",
    cargo: "Estudiante",
  },
  {
    id: "26",
    nombre: "Aleatorio22",
    cargo: "Estudiante",
  },
  {
    id: "27",
    nombre: "Aleatorio23",
    cargo: "Estudiante",
  },
  {
    id: "28",
    nombre: "Aleatorio24",
    cargo: "Estudiante",
  },
  {
    id: "29",
    nombre: "Aleatorio25",
    cargo: "Estudiante",
  },
  {
    id: "30",
    nombre: "Aleatorio26",
    cargo: "Estudiante",
  },
];

const Form_Jurado = ({ onClose, edit, onNuevoClick }) => {
  const [elecciones] = useState([
    {
      id: 1,
      nombre: "Elección 1",
      numMesas: 3, // Número de mesas para esta elección
    },
    {
      id: 2,
      nombre: "Elección 2",
      numMesas: 2, // Número de mesas para esta elección
    },
    {
      id: 3,
      nombre: "Elección 3",
      numMesas: 5, // Número de mesas para esta elección
    },
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post("/tu/ruta/en/el/backend", {
        id_mesa: mesaId,
        id_usuario: jurado.id, 
      });

      

      
    } catch (error) {
      console.error("Error al enviar datos al backend:", error);
    }
  };
  const [selectedEleccion, setSelectedEleccion] = useState("");
  const [showNumMesas, setShowNumMesas] = useState(false);

  const [mesas, setMesas] = useState([]);
  const [jurados, setJurados] = useState([]);

  const handleEleccionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedEleccion(selectedValue);

    // Mostrar el número de mesas para la elección seleccionada
    setShowNumMesas(true);
  };

  // Función para asignar jurados aleatorios a una mesa
  const asignarJuradosAleatorios = (docentes, estudiantes, numJurados) => {
    const juradosAleatorios = [];
    const disponibles = [...docentes, ...estudiantes]; // Combinar docentes y estudiantes

    for (let i = 0; i < numJurados; i++) {
      // Elegir un jurado aleatorio de la lista de disponibles
      const index = Math.floor(Math.random() * disponibles.length);
      const jurado = disponibles[index];

      // Agregar el jurado seleccionado a la lista de jurados aleatorios de la mesa
      juradosAleatorios.push(jurado);

      // Eliminar el jurado seleccionado de la lista de disponibles para que no se repita
      disponibles.splice(index, 1);
    }

    return juradosAleatorios;
  };

  const handleCreateMesas = (numMesas) => {
    const nuevasMesas = [];
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numMesas === 1) {
      nuevasMesas.push({
        id: 1,
        nombre: `Mesa 1`,
        jurado: [
          asignarJuradosAleatorios(docentes, estudiantes, 1)[0], // 1 docente
          asignarJuradosAleatorios(docentes, estudiantes, 1)[0], // 1 estudiante
        ],
      });
    } else if (numMesas > 1) {
      const letrasPorMesa = Math.ceil(letras.length / numMesas);

      for (let i = 0; i < numMesas; i++) {
        nuevasMesas.push({
          id: i + 1,
          nombre: `Mesa ${i + 1}`,
          jurado: [
            asignarJuradosAleatorios(docentes, estudiantes, 1)[0], // 1 docente
            asignarJuradosAleatorios(docentes, estudiantes, 1)[0], // 1 estudiante
          ],
        });
      }
    }

    setMesas(nuevasMesas);
  };

  const handleAsignarJurado = (mesaId, jurado) => {
    // Encuentra la mesa correspondiente por ID
    const mesaIndex = mesas.findIndex((mesa) => mesa.id === mesaId);

    if (mesaIndex !== -1) {
      // Copia la lista actual de jurados de la mesa y agrega el nuevo jurado
      const juradosMesa = [...mesas[mesaIndex].jurado, jurado];

      // Actualiza la mesa con la nueva lista de jurados
      const updatedMesa = {
        ...mesas[mesaIndex],
        jurado: juradosMesa,
      };

      // Actualiza la lista de mesas con la mesa actualizada
      const updatedMesas = [...mesas];
      updatedMesas[mesaIndex] = updatedMesa;

      // Actualiza el estado con las mesas actualizadas
      setMesas(updatedMesas);
    }
  };

  return (
    <div>
      <CssBaseline />

      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor="selectEleccion">Seleccionar Elección</InputLabel>
        <Select
          required
          label="Seleccionar Elección"
          id="selectEleccion"
          value={selectedEleccion}
          onChange={handleEleccionChange}
        >
          {elecciones.map((eleccion) => (
            <MenuItem key={eleccion.id} value={eleccion.id}>
              {eleccion.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {showNumMesas && (
        <div>
          <InputLabel>Número de Mesas:</InputLabel>
          <Box>
            {
              elecciones.find((eleccion) => eleccion.id === selectedEleccion)
                .numMesas
            }
          </Box>
        </div>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ marginLeft: 1 }}
        onClick={() =>
          handleCreateMesas(
            elecciones.find((eleccion) => eleccion.id === selectedEleccion)
              .numMesas
          )
        }
      >
        <AddIcon />
        Asignar Jurados
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre de la Mesa</TableCell>
              <TableCell>Jurado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mesas.map((mesa) => (
              <TableRow key={mesa.id}>
                <TableCell>{mesa.id}</TableCell>
                <TableCell>{mesa.nombre}</TableCell>
                <TableCell>
                  <CollapsibleTable
                    jurados={mesa.jurado}
                    onAsignarJurado={(jurado) =>
                      handleAsignarJurado(mesa.id, jurado)
                    }
                  />
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
    </div>
  );
};

Form_Jurado.propTypes = {
  onClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  onNuevoClick: PropTypes.func.isRequired,
};

export default Form_Jurado;

const CollapsibleTable = ({ jurados, onAsignarJurado }) => {
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
              <TableCell>Acción</TableCell>
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
