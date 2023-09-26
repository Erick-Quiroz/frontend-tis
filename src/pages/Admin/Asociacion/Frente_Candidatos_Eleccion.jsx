import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import TableProducts from "../../../hooks/Table/Table_Frente_Eleccion";
import ButtonProducts from "../../../hooks/utils/Button";

import DrawerProducts from "../../../hooks/Drawer/Drawer_Frente_Eleccion";
import { getApi } from "../../../api/api";

const Product = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [edit, setedit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    getProduct();
  }, []);
  const [radio, setradio] = useState(false);
  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  const editTrue = () => {
    setedit(true);
  };

  const editFalse = () => {
    setedit(false);
  };
  const handleChange = () => {
    setradio(!radio);
  };
  async function getProduct() {
    try {
      const productsData = await getApi("product");
      setProduct(productsData);
      console.log(productsData);
    } catch (error) {

      console.error("Error fetching products:", error);
    }
  }
  const handleEdit = (product) => {
    setSelectedProduct(product); 
  };

  return (
    <Admin>
      <Grid container spacing={2}>
        {/* ... */}
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                sx={{ borderBottom: "2px solid black", width: "100%" }}
              >
                Frente con candidatos
              </Typography>

              <ButtonProducts
                handleChange={handleChange}
                selectedProduct={selectedProduct}
                openDrawer={openDrawer}
                editFalse={editFalse}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Grid container style={containerChartStyles}>
            <Grid item xs={12}>
              <TableProducts
                products={product}
                handleEdit={handleEdit}
                openDrawer={openDrawer}
                editTrue={editTrue}
                getProduct={getProduct}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <DrawerProducts
          isOpen={drawerOpen}
          onClose={closeDrawer}
          selectedProduct={selectedProduct}
          edit={edit}
          getProduct={getProduct}
        />
      </div>
    </Admin>
  );
};

export default Product;
