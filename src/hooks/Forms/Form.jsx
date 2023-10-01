// Paso 1: CrearElecciónForm.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CrearElecciónForm = ({ onNextStep }) => {
  const [formData, setFormData] = useState({
    // ... Aquí van los campos del formulario para crear la elección
  });

  const handleNext = () => {
    // Valida y envía los datos del formulario para crear la elección
    // Luego llama a onNextStep() para pasar al siguiente paso
    onNextStep();
  };

  return (
    <div>
      {/* Renderiza los campos del formulario para crear la elección */}
      {/* Añade un botón para ir al siguiente paso */}
      <Button variant="contained" color="primary" onClick={handleNext}>
        Siguiente
      </Button>
    </div>
  );
};

export default CrearElecciónForm;

// Paso 2: AsociarFrente.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const AsociarFrente = ({ onPrevStep }) => {
  const [selectedFrente, setSelectedFrente] = useState(null);

  const handlePrev = () => {
    // Llama a onPrevStep() para volver al paso anterior
    onPrevStep();
  };

  const handleFinish = () => {
    // Asocia la elección con el frente seleccionado
    // Realiza cualquier acción necesaria y finaliza el proceso
  };

  return (
    <div>
      {/* Renderiza una lista de frentes para que el usuario seleccione */}
      {/* Añade botones para ir al paso anterior o finalizar */}
      <Button variant="contained" color="primary" onClick={handlePrev}>
        Anterior
      </Button>
      <Button variant="contained" color="primary" onClick={handleFinish}>
        Finalizar
      </Button>
    </div>
  );
};

export default AsociarFrente;
