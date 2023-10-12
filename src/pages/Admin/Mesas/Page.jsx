import { useState, useEffect } from "react";
import { Admin } from "../../../components/layout/admin/Admin";
import { Grid, Typography } from "@mui/material";
import { containerChartStyles } from "../Home/utils/HomeStyles";
import ButtonProducts from "../../../hooks/utils/Button";

import Drawer from "../../../hooks/Drawer/Drawer";
// import { getApi } from "../../../api/api";
import Form_Eleccion from "../../../hooks/Forms/Form_Eleccion";
import { Facultad } from "../../../components/iu/admin/items/facultad.class";
import { Jurado } from "../../../components/iu/admin/items/jurado.class";
import ViewMesasEleccion from "../../../hooks/Table/View_Mesas_Eleccion";

const Page_Mesa = () => {
  const name = "Mesas";

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [edit, setedit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lista, setlista] = useState({
    facultad_mesas: [
                      new Facultad('Facultad de Ciencias y Tecnologia', 
                                  [new Jurado('Ing. Mecanica', 
                                  ['Osbaldo Rosales Garcia', 'Juan Antonio Aguilar Mendieta', 'Romario Peredo Valdez', 'Ignacio Salvatierra Avilez']),
                                  new Jurado('Ing. Informatica', 
                                  ['Pedro Corrales Figueroa', 'Eduardo Meneces Encias', 'Pedro Corrales Figueroa', 'Eduardo Meneces Encias'])
                                  ]),
                      new Facultad('Facultad de Ciencias Arquitectonicas', 
                                  [new Jurado('Lic. en Arquitectura', 
                                  ['Jurado Lic. en Arquitectura 1', 'Jurado Lic. en Arquitectura 2', 'Jurado Lic. en Arquitectura 1', 'Jurado Lic. en Arquitectura 2'])
                                  ])
                    ],
                                  
  });

  const temp = lista.facultad_mesas;
  function addFacultad(object_data, list_jurados){
    console.log(list_jurados)
    if(temp.find(facultad => facultad.nombre_facultad === object_data.facultad) !== undefined){
      temp.map((facultad) => {
        if((facultad.list_carreras.find(
              carrera => carrera.nombre_carrera === object_data.carrera
              )) === undefined && facultad.nombre_facultad === object_data.facultad){
          facultad.pushCarrera(new Jurado(object_data.carrera, list_jurados))
        }else{
          console.log('No se puede agregar a la carrera ya esta registrada');  
        }
      });
    }else{
      const newfacultad = new Facultad(object_data.facultad, [new Jurado(object_data.carrera, list_jurados)]);
      lista.facultad_mesas.push(newfacultad);
      setlista({
        ...lista,
        facultad_mesas:temp
      });
      console.log(lista);
    }
    console.log(lista);
  }

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

  const editFalse = () => {
    setedit(false);
  };
  const handleChange = () => {
    setradio(!radio);
  };
  async function getProduct() {
    try {
      // const productsData = await getApi("product");
      // setProduct(productsData);
      // console.log(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
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
                {name}
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
              <ViewMesasEleccion mesasFacultades={ lista }/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Drawer
          isOpen={drawerOpen}
          onClose={closeDrawer}
          selectedProduct={selectedProduct}
          edit={edit}
          getProduct={getProduct}
          name={name}
          form={
            <Form_Eleccion
              onClose={closeDrawer}
              selectedProduct={selectedProduct}
              edit={edit}
              getProduct={getProduct}
              function_add={ addFacultad }
            />
          }
        />
      </div>
    </Admin>
  );
};

export default Page_Mesa;
