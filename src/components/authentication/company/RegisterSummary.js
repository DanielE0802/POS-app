import React from 'react';
import { Button, Card, Divider, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack5';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router-dom';
import { MIconButton } from '../../@material-extend';
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function RegisterSummary() {
  const { updateProfile, company, pdvCompany, user } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleFinish = async () => {
    try {
      await updateProfile(user.id, {
        isFirstLogin: false
      });
      enqueueSnackbar('Registro completado', {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      navigate(PATH_DASHBOARD.general.app);
      console.log('registro completado');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error al registrar', {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
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
              {company.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              NIT
            </Typography>
            <Typography variant="body2" gutterBottom>
              {company.nit}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Dirección
            </Typography>
            <Typography variant="body2" gutterBottom>
              {company.address}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Teléfono
            </Typography>
            <Typography variant="body2" gutterBottom>
              {company.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Cantidad de empleados
            </Typography>
            <Typography variant="body2" gutterBottom>
              {company.quantity_employees}
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ p: 3, overflow: 'visible', zIndex: 99, mt: 3 }}>
        <Typography variant="h4">Información de punto de venta principal</Typography>
        <Divider sx={{ mb: 3, mt: 0.5 }} />
        {console.log(pdvCompany)}
        {pdvCompany !== '' && pdvCompany !== null && pdvCompany !== null ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Nombre
              </Typography>
              <Typography variant="body2" gutterBottom>
                {pdvCompany[0] ? pdvCompany[0].name : pdvCompany.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Descripción
              </Typography>
              <Typography variant="body2" gutterBottom>
                {pdvCompany[0] ? pdvCompany[0].description : pdvCompany.description}
                {console.log(pdvCompany)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Dirección
              </Typography>
              <Typography variant="body2" gutterBottom>
                {pdvCompany[0] ? pdvCompany[0].address : pdvCompany.address}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Teléfono
              </Typography>
              <Typography variant="body2" gutterBottom>
                {pdvCompany[0] ? pdvCompany[0].phone : pdvCompany.phone}
              </Typography>
            </Grid>
          </Grid>
        ) : null}
      </Card>
      <Button onClick={() => handleFinish()} sx={{ mt: 3 }} variant="contained" color="primary" fullWidth>
        Finalizar
      </Button>
    </div>
  );
}
