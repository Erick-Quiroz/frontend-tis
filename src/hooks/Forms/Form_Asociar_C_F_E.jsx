import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Success } from "../Alerts/Success";
import { postProduct } from "../../api/api";

export default function Form_Asociar_C_F_E() {
  const [frentes] = useState([
    { id: 1, nombre: "Frente 1" },
    { id: 2, nombre: "Frente 2" },
    { id: 3, nombre: "Frente 3" },
  ]);

  const [candidatos] = useState([
    { id: 1, nombre: "Candidato 1" },
    { id: 2, nombre: "Candidato 2" },
    { id: 3, nombre: "Candidato 3" },
  ]);

  const [elecciones] = useState([
    { id: 1, nombre: "Elección 1" },
    { id: 2, nombre: "Elección 2" },
    { id: 3, nombre: "Elección 3" },
  ]);

  const [selectedFrente, setSelectedFrente] = useState("");
  const [selectedCandidato, setSelectedCandidato] = useState("");
  const [selectedEleccion, setSelectedEleccion] = useState("");

  const handleAsociarClick = async () => {
    try {
      const data = {
        frente_id: selectedFrente,
        candidato_id: selectedCandidato,
        eleccion_id: selectedEleccion,
      };

      // Envía los datos como JSON
      const savedProduct = await postProduct("asociaciones", data);
      Success.showSuccess("Asociado con éxito");
    } catch (error) {
      console.error("Error al realizar la asociación:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={3}>
        <form>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <label>Frente:</label>
            <Select
              value={selectedFrente}
              onChange={(e) => setSelectedFrente(e.target.value)}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {frentes.map((frente) => (
                <MenuItem key={frente.id} value={frente.id}>
                  {frente.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <label>Candidato:</label>
            <Select
              value={selectedCandidato}
              onChange={(e) => setSelectedCandidato(e.target.value)}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {candidatos.map((candidato) => (
                <MenuItem key={candidato.id} value={candidato.id}>
                  {candidato.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <label>Elección:</label>
            <Select
              value={selectedEleccion}
              onChange={(e) => setSelectedEleccion(e.target.value)}
            >
              <MenuItem value="">Seleccionar</MenuItem>
              {elecciones.map((eleccion) => (
                <MenuItem key={eleccion.id} value={eleccion.id}>
                  {eleccion.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="button"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAsociarClick}
          >
            Asociar
          </Button>
        </form>
      </Box>
    </Container>
  );
}
