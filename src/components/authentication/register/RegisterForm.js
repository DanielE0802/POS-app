import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import MuiPhoneNumber from 'material-ui-phone-number';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { capitalCase } from 'change-case';

// material
import { Stack, TextField, IconButton, InputAdornment, Alert } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import { Link, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const { method } = useAuth();
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Ingrese un nombre valido')
      .max(50, 'Ingrese un nombre valido')
      .required('Ingrese el nombre'),
    lastName: Yup.string()
      .min(3, 'Ingrese un apellido valido')
      .max(50, 'Ingrese un apellido más corto')
      .required('Ingrese el apellido'),
    email: Yup.string().email('Ingrese un correo valido').required('Correo es requerido'),
    password: Yup.string().required('La contraseña es requerida'),
    tel: Yup.string(),
    dni: Yup.string()
      .min(10, 'Ingrese un número de Cédula de ciudadanía')
      .max(10, 'Ingrese un número de Cédula de ciudadanía')
      .required('Ingrese un número de Cédula de ciudadanía')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      tel: '',
      dni: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const response = await register(
          values.email,
          values.password,
          values.firstName,
          values.lastName,
          values.dni,
          values.tel
        );
        enqueueSnackbar('Registro del usuario completado', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
        if (response.status === 201) {
          // Navigate to login
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Comience completamente gratis
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>No necesita tarjeta de credito</Typography>
        </Box>
        <Tooltip title={capitalCase(method)}>
          <Box component="img" src={`/static/auth/ic_${method}.png`} sx={{ width: 32, height: 32 }} />
        </Tooltip>
      </Box>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nombre"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              fullWidth
              label="Apellido"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <MuiPhoneNumber
              fullWidth
              variant="outlined"
              onChange={(value) => {
                formik.setFieldValue('tel', value);
              }}
              name="tel"
              defaultCountry="co"
              label="teléfono"
              regions={['south-america']}
              error={Boolean(touched.tel && errors.tel)}
              helperText={touched.tel && errors.tel}
            />

            <TextField
              fullWidth
              type="number"
              label="Cédula de ciudadania"
              autoComplete="dni"
              error={Boolean(touched.dni && errors.dni)}
              helperText={touched.dni && errors.dni}
              {...getFieldProps('dni')}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Correo electrónico"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Contraseña"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Registrarse
          </LoadingButton>
        </Stack>
      </Form>
      <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
        Al registrarse aceptas terminos y condiciones. Por favor lea nuestros&nbsp;
        <Link underline="always" color="text.primary" href="#">
          Terminos y condiciones
        </Link>
        &nbsp;y&nbsp;
        <Link underline="always" color="text.primary" href="#">
          Politica de privacidad
        </Link>
        .
      </Typography>
    </FormikProvider>
  );
}
