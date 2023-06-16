import React from 'react';
import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

export default function RegisterSummary() {
  const { updateProfile } = useAuth();

  const values = {
    name: 'Empresa de prueba',
    address: 'Calle 123',
    nit: '1234567890',
    tel: '1234567890',
    quantity_employee: '10',
    economic_activity: 'Comercio'
  };

  const handleFinish = async () => {
    console.log('Finish');

    // update profile
    const resp = await updateProfile('ce654b52-4b6c-484c-9bb0-e8d03ff3cac3', {
      ifFirstLogin: false
    });
    console.log(resp);
  };

  return (
    <div>
      <Card sx={{ p: 3, mt: 2, overflow: 'visible', zIndex: 99 }}>
        <Typography variant="h5">Información de la empresa</Typography>
        <Divider sx={{ mb: 3, mt: 0.5 }} />
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Nombre
            </Typography>
            <Typography variant="body2" gutterBottom>
              {values.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              NIT
            </Typography>
            <Typography variant="body2" gutterBottom>
              {values.nit}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Dirección
            </Typography>
            <Typography variant="body2" gutterBottom>
              {values.address}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Teléfono
            </Typography>
            <Typography variant="body2" gutterBottom>
              {values.tel}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Cantidad de empleados
            </Typography>
            <Typography variant="body2" gutterBottom>
              {values.quantity_employee}
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 3, overflow: 'visible', zIndex: 99, mt: 3 }}>
        <Typography variant="h4">Información de punto de venta principal</Typography>
        <Divider sx={{ mb: 3, mt: 0.5 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Nombre
            </Typography>
            <Typography variant="body2" gutterBottom>
              {values.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Dirección
            </Typography>
            <Typography variant="body2" gutterBottom>
              {values.address}
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Button onClick={handleFinish} sx={{ mt: 3 }} variant="contained" color="primary" fullWidth>
        Finalizar
      </Button>
    </div>
  );
}
