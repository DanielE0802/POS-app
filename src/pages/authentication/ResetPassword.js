import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { ResetPasswordForm } from '../../components/authentication/reset-password';
//
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <RootStyle title="Reset Password">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                ¿Olvidaste tu contraseña?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Por favor ingresa tu correo electrónico para recibir un enlace para crear una nueva contraseña.
              </Typography>

              <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

              <Button fullWidth size="large" component={RouterLink} to="/" sx={{ mt: 1 }}>
                Atrás
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Solicitud enviada con éxito
              </Typography>
              <Typography>
                Hemos enviado un correo electrónico de confirmación a &nbsp;
                <strong>{email}</strong>
                <br />
                Por favor revise su correo electrónico.
              </Typography>

              <Button size="large" variant="contained" component={RouterLink} to="/" sx={{ mt: 5 }}>
                Atrás
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
