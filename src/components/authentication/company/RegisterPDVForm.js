import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack5';
import React, { useEffect, useState } from 'react';
import { Alert, Autocomplete, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { LoadingButton } from '@material-ui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import RequestService from '../../../api/services/service';
import useAuth from '../../../hooks/useAuth';
import { MIconButton } from '../../@material-extend';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

export default function RegisterPDVForm({ setActiveStep, activeStep, handleBack, setPrevValues, prevValues }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { company, pdvCompany, updatePDV, createPDV } = useAuth();
  const isMountedRef = useIsMountedRef();

  const RegisterPDVSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    description: Yup.string().required('Descripción requerida'),
    departament: Yup.object().required('Departamento requerido'),
    city: Yup.object().required('Ciudad requerida'),
    address: Yup.string().required('Dirección requerida'),
    phone: Yup.string().required('Teléfono requerido')
  });

  const formik = useFormik({
    initialValues: {
      name: prevValues?.name || '',
      description: prevValues?.description || '',
      departament: prevValues?.departament || '',
      city: prevValues?.location?.id || '',
      address: prevValues?.address || '',
      main: true,
      phone: prevValues?.phone || '',
      company: ''
    },
    validationSchema: RegisterPDVSchema,
    onSubmit: async (values, { setErrors, setSubmitting, setValues, setFieldValue }) => {
      try {
        const databody = {
          name: values.name,
          description: values.description,
          address: values.address,
          phone: values.phone,
          main: values.main,
          company: { id: values.company.id },
          location: {
            id: values.city.id
          }
        };
        const response = await createPDV(databody);
        // TODO: faltan municipios en el endpoint (cali por ejemplo)

        enqueueSnackbar('Registro del punto de venta completado', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        setPrevValues(values);
        // TODO: si tengo prevValues, entonces hago un update, sino hago un create

        setSubmitting(false);
        setActiveStep(2);
      } catch (error) {
        console.error(error);
        setErrors({ afterSubmit: error.message });
        setSubmitting(false);
      }
    }
  });

  const [deparments, setDepartments] = React.useState([]);
  const [department, setDepartment] = React.useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    console.log('este es el register pdv form');
    locations();
  }, []);

  const locations = async () => {
    const resp = (await RequestService.getLocations(true)).data;
    setDepartments(resp);
  };

  const { errors, touched, handleSubmit, getFieldProps, values, isSubmitting, setFieldValue } = formik;

  useEffect(() => {
    if (company !== undefined && company !== null) {
      setFieldValue('company', { id: company[0] ? company[0].id : company.id });
      console.log(company);
    }
  }, [company, setFieldValue]);
  useEffect(() => {
    // setMunicipios(department?.towns);
    const towns = department?.towns ? department.towns : [];
    setMunicipios(towns);
    // setMunicipios(municipiosOfDepartment);
  }, [values.departament, department]);
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Typography sx={{ marginTop: 5, mb: 3 }} variant="subtitle1" textAlign="center">
          Agrega tu punto de venta principal, despues podrás agregar más puntos de venta.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="Nombre punto de venta"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="Descripción"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Autocomplete
            sx={{ mb: 2 }}
            fullWidth
            getOptionLabel={(option) => option.name || ''}
            autoComplete="departament"
            options={deparments}
            {...getFieldProps('departament')}
            onChange={(event, value) => {
              setDepartment(value);
              values.departament = value;
              values.city = '';
            }}
            renderInput={(params) => <TextField {...params} label="Departamento" />}
            error={Boolean(touched.departament && errors.departament)}
            helperText={touched.departament && errors.departament}
          />
          <Autocomplete
            sx={{ mb: 2 }}
            fullWidth
            autoComplete="city"
            options={municipios}
            getOptionLabel={(option) => option.name || ''}
            {...getFieldProps('city')}
            onChange={(event, value) => {
              console.log(value);
              values.city = value;
            }}
            renderInput={(params) => <TextField {...params} label="Ciudad" />}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="Dirección"
            {...getFieldProps('address')}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            label="Teléfono"
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </Stack>
        <Stack sx={{ marginTop: 8 }} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button onClick={handleBack} variant="outlined" component="label">
            Anterior
          </Button>
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Siguiente paso
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

// RegisterPDVForm.propTypes = {
//   nextStep: PropTypes.func,
//   activeStep: PropTypes.number,
//   handleBack: PropTypes.func,
//   setPrevValues: PropTypes.func,
//   prevValues: PropTypes.object
// };
