import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import React from 'react';
import { Alert, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@material-ui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Icon, InputAdornment } from '@material-ui/core';
import Zoom from '@mui/material/Zoom';
import { InlineIcon } from '@iconify/react';
import PropTypes from 'prop-types';
import RequestService from '../../../api/services/service';
import useAuth from '../../../hooks/useAuth';

export default function RegisterCompanyForm({ nextStep, activeStep, setPrevValues, prevValues }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { createCompany } = useAuth();

  console.log(activeStep);

  const RegisterCompanySchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Ingrese un nombre valido')
      .max(50, 'Ingrese un nombre valido')
      .required('Ingrese el nombre'),
    address: Yup.string()
      .min(3, 'Ingrese una dirección valida')
      .max(50, 'Ingrese una dirección valida')
      .required('Ingrese la dirección'),
    nit: Yup.string().required('Ingrese un número de NIT valido'),
    phoneNumber: Yup.string().required('Ingrese un número de teléfono valido'),
    quantity_employees: Yup.string().required('Ingrese la cantidad de empleados'),
    economic_activity: Yup.string().required('Ingrese la actividad económica'),
    website: Yup.string().required('Ingrese una URL valida')
  });

  const formik = useFormik({
    initialValues: {
      name: prevValues?.name || '',
      address: prevValues?.address || '',
      nit: prevValues?.nit || '',
      phoneNumber: prevValues?.phoneNumber || '',
      website: prevValues?.website || '',
      quantity_employees: prevValues?.quantity_employees || '',
      economic_activity: prevValues?.economic_activity || ''
    },
    validationSchema: RegisterCompanySchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        console.log(prevValues);
        if (prevValues.id) {
          await RequestService.updateCompany({ databody: values, id: prevValues.id });
          enqueueSnackbar('Actualización de la empresa completado', {
            variant: 'success',
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)}>
                <Icon icon="eva:close-fill" />
              </IconButton>
            )
          });
        } else {
          await createCompany({ databody: values });
          enqueueSnackbar('Registro de la empresa completado', {
            variant: 'success',
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)}>
                <Icon icon="eva:close-fill" />
              </IconButton>
            )
          });
          setPrevValues(values);
        }
        nextStep();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setErrors({ afterSubmit: error.message });
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ marginTop: 1 }} spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <Typography variant="subtitle1" textAlign="center" sx={{ mb: 3 }}>
            Ingresa la información de la empresa
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nombre de la empresa"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              label="Dirección de la empresa"
              {...getFieldProps('address')}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="NIT"
              {...getFieldProps('nit')}
              error={Boolean(touched.nit && errors.nit)}
              helperText={touched.nit && errors.nit}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Número de Identificación Tributaria" TransitionComponent={Zoom} arrow>
                      <IconButton>
                        <InlineIcon icon="material-symbols:help-outline" width={30} height={30} />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
            <MuiPhoneNumber
              fullWidth
              variant="outlined"
              onChange={(value) => {
                formik.setFieldValue('phoneNumber', value);
              }}
              value={formik.values.phoneNumber}
              name="phoneNumber"
              defaultCountry="co"
              label="Número de teléfono"
              regions={['south-america']}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Sitio web"
              {...getFieldProps('website')}
              error={Boolean(touched.website && errors.website)}
              helperText={touched.website && errors.website}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Cantidad de empleados"
              {...getFieldProps('quantity_employees')}
              error={Boolean(touched.quantity_employees && errors.quantity_employees)}
              helperText={touched.quantity_employees && errors.quantity_employees}
            />
            <TextField
              fullWidth
              label="Actividad económica"
              {...getFieldProps('economic_activity')}
              error={Boolean(touched.economic_activity && errors.economic_activity)}
              helperText={touched.economic_activity && errors.economic_activity}
            />
          </Stack>
        </Stack>
        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Siguiente paso
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

RegisterCompanyForm.propTypes = {
  nextStep: PropTypes.func,
  activeStep: PropTypes.number,
  handleBack: PropTypes.func,
  setPrevValues: PropTypes.func,
  prevValues: PropTypes.object
};
