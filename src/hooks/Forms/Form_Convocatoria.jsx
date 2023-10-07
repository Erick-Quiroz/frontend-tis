import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import {
  FormControl,
  TextField,
  CssBaseline,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from '@mui/material';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { postConv } from '../../api/api';

const Form_Convocatoria = ({ onClose, edit }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateB: '', // Inicializamos como cadena de fecha vacía
    dateE: '', // Inicializamos como cadena de fecha vacía
    facultad: '',
    carrera: '',
    tipo: '',
  });

  const [carreras, setCarreras] = useState([]);

  const formRef = useRef(null);

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

    if (value === 'Facultad de veterinaria') {
      setCarreras(['Veterinaria']);
    } else if (value === 'Facultad de Ciencias y Tecnologia') {
      setCarreras([
        'Ing. Sistemas',
        'Ing. Electronica',
        'Ing. Electrica',
        'Ing. Civil',
        'Ing. Industrial',
      ]);
    } else {
      setCarreras([]);
    }
  };

  const handleDateRangeChange = (newDateRange) => {
    setFormData({
      ...formData,
      dateB: newDateRange[0], // Guardamos la cadena de fecha directamente
      dateE: newDateRange[1], // Guardamos la cadena de fecha directamente
    });
  };

  const handleGeneratePDF = () => {
    try {
      // Datos del formulario
      const dataToSend = {
        name: formData.name,
        dateB: formData.dateB,
        dateE: formData.dateE,
        facultad: formData.facultad,
        carrera: formData.carrera,
        tipo: formData.tipo,
      };
  
      // Formatear las fechas en el formato deseado
      const formattedDateB = new Date(dataToSend.dateB).toDateString();
      const formattedDateE = new Date(dataToSend.dateE).toDateString();
  
      // Crear un nuevo documento PDF con margen de 1.5 cm en todas las direcciones
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        top: 15, // Margen superior de 1.5 cm
        right: 15, // Margen derecho de 1.5 cm
        bottom: 15, // Margen inferior de 1.5 cm
        left: 15, // Margen izquierdo de 1.5 cm
      });
  
      // Texto predeterminado con marcadores de posición
      const textoPredeterminado = `CONVOCATORIA
  ELECCIONES DE "${dataToSend.tipo}" Y
  ESTUDIANTES DE BASE AL HONORABLE CONSEJO
  DE LA CARRERA DE "${dataToSend.carrera}" de la "${dataToSend.facultad}"
  Los plazos de tiempos para inscripción de partidos y representantes serán de "${formattedDateB}" a "${formattedDateE}" sin nada más que decir, mis saludos cordiales.`;
  
      // Dividir el texto en líneas de acuerdo con el ancho de la página
      const lines = pdf.splitTextToSize(textoPredeterminado, 180);
  
      // Agregar las líneas al PDF
      pdf.text(lines, 15, 15);
  
      // Descargar el PDF
      pdf.save('formulario.pdf');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Tu lógica de manejo de envío de datos aquí
      const dataToSend = {
        name: formData.name,
        dateB: formData.dateB,
        dateE: formData.dateE,
        facultad: formData.facultad,
        carrera: formData.carrera,
        tipo: formData.tipo,
      };

      // Envía los datos al servidor si es necesario
      const jsonData = JSON.stringify(dataToSend);
      const response = await postConv('http://localhost:8000/api/v1/registerconv', jsonData);

      // Check the response status
      if (response.status === 200) {
        // The request was successful
        console.log('Datos enviados con éxito');
      } else {
        console.error('Error en la solicitud a la API');
      }

      onClose();
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
      }}
    >
      <CssBaseline />

      <form onSubmit={handleSubmit}>
        <FormControl
          sx={{
            width: 320,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
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
              <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker
                  localeText={{ start: 'Fecha inicio', end: 'Fecha fin' }}
                  onChange={handleDateRangeChange}
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
                  name: 'facultad',
                  id: 'facultad',
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
                  name: 'carrera',
                  id: 'carrera',
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

        <Box sx={{ mt: 2 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="tipo_eleccion">Tipo de eleccion</InputLabel>
            <Select
              required
              label="tipo de eleccion"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              inputProps={{
                name: 'tipo',
                id: 'tipo',
              }}
            >
              <MenuItem value="Rector">Rector</MenuItem>
              <MenuItem value="Decano">Decano</MenuItem>
              <MenuItem value="HCF">HCF</MenuItem>
              <MenuItem value="HCU">HCU</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            sx={{
              width: '100%',
              borderRadius: '55px',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.9)',
            }}
            variant="solid"
            color="primary"
          >
            {edit ? 'Editar Convocatoria' : 'Crear Convocatoria'}
          </Button>
        </Box>
      </form>

      {/* Botón para generar el PDF */}
      <Button
        onClick={handleGeneratePDF}
        sx={{
          width: '100%',
          borderRadius: '55px',
          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.9)',
          marginTop: '16px',
        }}
        variant="solid"
        color="primary"
      >
        Generar PDF
      </Button>
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
