import axios from "axios";

export const getApi = async (route) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_PRODUCT}/${route}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const postProduct = async (route, formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_PRODUCT}/${route}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al guardar el producto:", error);
    throw error;
  }
};
axios.defaults.withCredentials = true;
export const postApi = async (route, jsonData) => {
  console.log(jsonData);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_PRODUCT}/${route}`,
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesion:", error);
    throw error;
  }
};
export const deleteApi = async (productId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_PRODUCT}/product/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};
export const putApi = async (route, productId, formData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_PRODUCT}/${route}/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("FormDATA: ", formData);
    return response.data;
  } catch (error) {
    console.error("Error al editar el producto:", error);
    throw error;
  }
};