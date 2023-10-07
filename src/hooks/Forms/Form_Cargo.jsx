import { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, TextField, CssBaseline } from "@mui/material";

import { Box, Button } from "@mui/material";
// import { postProduct, putApi } from "../../api/api";
// import { Success } from "../Alerts/Success";
// import { Danger } from "../Alerts/Danger";

const Form_Cargo = ({ onClose, edit }) => {
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
        // await putApi(selectedProduct.id, formData);
      } else {
        // await postProduct(formData);
        console.log(formData);
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

          <Box sx={{ mt: 0, height: "auto" }}>
            <TextField
              label="Descripcion"
              variant="outlined"
              multiline
              fullWidth
              name="descripcion"
              value={formData.description}
              onChange={handleChange}
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
            />
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
            {edit ? "Editar Cargo" : "Crear Cargo"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form_Cargo;

Form_Cargo.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object,
  edit: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired,
};
