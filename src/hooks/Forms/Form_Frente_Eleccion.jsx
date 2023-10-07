import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, TextField, CssBaseline } from "@mui/material";
import PropTypes from "prop-types";
import { Success } from "../Alerts/Success";
import { Danger } from "../Alerts/Danger";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { postProduct, putApi } from "../../api/api";
import { Box, Button, Grid } from "@mui/material";

const Form_Frente_Eleccion = ({
  onClose,
  selectedProduct,
  edit,
  getProduct,
}) => {
  const [name, setProductName] = useState("");
  const [price, setProductPrice] = useState("");
  const [quantity, setProductQuantity] = useState("");
  const [year, setYear] = useState(0);
  const [selectedImages, setSelectedImages] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImagesURL, setSelectedImagesURL] = useState(["", "", "", ""]);

  const currentYear = dayjs().year();

  useEffect(() => {
    if (edit && selectedProduct) {
      setProductName(selectedProduct.name);
      setProductPrice(selectedProduct.price);
      setProductQuantity(selectedProduct.quantity);
      setYear(selectedProduct.year);

      setSelectedImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[0] = selectedProduct.images.image1 || "";
        updatedImages[1] = selectedProduct.images.image2 || "";
        updatedImages[2] = selectedProduct.images.image3 || "";
        updatedImages[3] = selectedProduct.images.image4 || "";
        return updatedImages;
      });

      setSelectedImagesURL((prevImagesURL) => {
        const updatedImagesURL = [...prevImagesURL];
        updatedImagesURL[0] = selectedProduct.images.image1 || "";
        updatedImagesURL[1] = selectedProduct.images.image2 || "";
        updatedImagesURL[2] = selectedProduct.images.image3 || "";
        updatedImagesURL[3] = selectedProduct.images.image4 || "";
        return updatedImagesURL;
      });
    }
  }, [edit, selectedProduct]);

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);
  };

  const handleProductYearChange = (date) => {
    setYear(date.year());
  };

  const handleProductPriceChange = (e) => {
    const value = e.target.value;
    setProductPrice(value);
  };

  const handleProductQuantityChange = (e) => {
    const value = e.target.value;
    setProductQuantity(value);
  };

  const handleImageChange = async (event, index) => {
    const file = event.target.files[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      try {
        const resizedImage = await resizeImage(file, 1080, 1920); // Cambia maxWidth y maxHeight según tus necesidades

        setSelectedImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[index] = resizedImage;
          return updatedImages;
        });

        setSelectedImagesURL((prevImagesURL) => {
          const imageURL = URL.createObjectURL(resizedImage);
          const updatedImagesURL = [...prevImagesURL];
          updatedImagesURL[index] = imageURL;
          return updatedImagesURL;
        });
      } catch (error) {
        console.error("Error al redimensionar la imagen:", error);
        // Puedes manejar el error aquí, por ejemplo, mostrar una notificación al usuario
      }
    } else {
      setSelectedImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = null;
        return updatedImages;
      });

      setSelectedImagesURL((prevImagesURL) => {
        const updatedImagesURL = [...prevImagesURL];
        updatedImagesURL[index] = "";
        return updatedImagesURL;
      });
    }
  };

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        let width = image.width;
        let height = image.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          file.type || "image/jpeg",
          0.92 // Cambia la calidad según tus preferencias
        );
      };

      image.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      if (edit) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("model", year);

        formData.append("image1", selectedImages[0]);
        formData.append("image2", selectedImages[1]);
        formData.append("image3", selectedImages[2]);
        formData.append("image4", selectedImages[3]);

        const savedProduct = await putApi(
          "product",
          selectedProduct._id,
          formData
        );
        console.log("Producto actualizado:", savedProduct);
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("model", year);

        formData.append("image1", selectedImages[0]);
        formData.append("image2", selectedImages[1]);
        formData.append("image3", selectedImages[2]);
        formData.append("image4", selectedImages[3]);
        console.log("Producto POST :", {
          name,
          price,
          quantity,
          year,
          image1: selectedImages[0],
          image2: selectedImages[1],
          image3: selectedImages[2],
          image4: selectedImages[3],
        });
        const savedProduct = await postProduct("product/upload", formData);
        console.log("Producto guardado:", savedProduct);
      } 

      handleCloseDrawer();
      getProduct();
      Success.showSuccess("Producto guardado con éxito");
    } catch (error) {
      if (edit) {
        console.error("Error al actualizar el producto:", error);
        Danger.showError("Error al actualizar el producto");
      } else {
        console.error("Error al crear el producto:", error);
        Danger.showError("Error al guardar el producto");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDrawer = () => {
    onClose();
  };

  // ...

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <CssBaseline />

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
            value={name}
            onChange={handleProductNameChange}
            margin="dense"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            required
            label="Precio"
            variant="outlined"
            type="number"
            fullWidth
            value={price}
            onChange={handleProductPriceChange}
          />
        </Box>
        <Box sx={{ mt: 2, marginBottom: 2 }}>
          <TextField
            required
            label="Cantidad"
            variant="outlined"
            fullWidth
            value={quantity}
            onChange={handleProductQuantityChange}
            type="number"
          />
        </Box>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DemoItem label={`Modelo`}>
              <DatePicker
                placeholder="Hola"
                views={["year"]}
                openTo="year"
                minDate={dayjs("2000-01-01")}
                maxDate={dayjs(`${currentYear}-01-01`)}
                onChange={handleProductYearChange}
                sx={{ margin: 0, padding: 0, width: "100%" }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>

        <Grid container spacing={2} mt={2}>
          {selectedImagesURL.map((imageURL, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6} md={6} className="align-center">
                <Button
                  component="label"
                  variant="contained"
                  color="primary"
                  sx={{
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                    borderRadius: "8px",
                    fontSize: "11px",
                    padding: "8px 16px",
                  }}
                >
                  Cargar imagen {index + 1}
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    style={{ display: "none" }}
                    onChange={(event) => handleImageChange(event, index)}
                  />
                </Button>
              </Grid>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                  margin: 0,
                }}
              >
                <Grid
                  item
                  xs={5}
                  md={5}
                  style={{ textAlign: "center", padding: 0, margin: 0 }}
                >
                  {imageURL && (
                    <img
                      src={imageURL}
                      style={{
                        height: "7vh",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </Grid>
                <Grid
                  item
                  xs={1}
                  md={1}
                  style={{ textAlign: "left", padding: 0, margin: 25 }}
                ></Grid>
              </div>
            </React.Fragment>
          ))}
        </Grid>
      </FormControl>

      <Box sx={{ mt: 2 }}>
        {edit ? (
          <Button
            sx={{
              width: "100%",
              borderRadius: "55px",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.9)",
            }}
            variant="solid"
            color="primary"
            onClick={handleSave}
          >
            Actualizar producto
          </Button>
        ) : isLoading ? (
          <Button
            loading
            sx={{
              width: "100%",
              borderRadius: "55px",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.9)",
            }}
            variant="solid"
            color="primary"
            onClick={handleSave}
          >
            Crear producto
          </Button>
        ) : (
          <Button
            sx={{
              width: "100%",
              borderRadius: "55px",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.9)",
            }}
            variant="solid"
            color="primary"
            onClick={handleSave}
          >
            Crear producto
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Form_Frente_Eleccion;

Form_Frente_Eleccion.propTypes = {
  onClose: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object,
  edit: PropTypes.bool.isRequired,
  getProduct: PropTypes.func.isRequired,
};
