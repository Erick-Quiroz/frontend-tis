import { Typography, Card, Avatar, CardContent, Container, Grid } from '@mui/material';
import PropTypes from 'prop-types';

const ViewMesasEleccion = ({ mesasFacultades }) => {

  return (
    <Container>
      { mesasFacultades.facultad_mesas.map((facultad, keyFacultad) => (
          <Grid
            key={ keyFacultad }
          >
            <Typography variant="h5" sx={{ borderBottom: '2px solid black', width: '100%'}} >
              {facultad.nombre_facultad}
            </Typography>
            <Grid
              container spacing={2}
            >
              { facultad.list_carreras.map((carrera, keyCarrera) => (
                  <Grid
                    key={ keyCarrera }
                    item xs={12} sm={6} md={3}
                  >
                    <Card
                      item xs={12} sm={6} md={3}
                    >
                      <Typography
                        variant="h6" sx={{ borderBottom: '2px solid black', width: '100%', textDecoration: 'none'}}
                      >
                        {carrera.nombre_carrera}
                      </Typography>
                      <CardContent >
                        {carrera.list_jurados.map((persona, pIndex) => (
                          <div key={pIndex} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',margin:"10px" }}>
                            <Avatar
                              src='https://picsum.photos/600/400'
                              alt=''
                              sx={{ height: 56, width: 56 }}
                            />
                            <Typography variant="h7" sx={{ width: '100%' ,marginLeft:2}}>
                              {persona}
                            </Typography>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        ))}
    </Container>
    
  );
};

ViewMesasEleccion.propTypes = {
  mesasFacultades: PropTypes.array.isRequired,
}

export default ViewMesasEleccion;
