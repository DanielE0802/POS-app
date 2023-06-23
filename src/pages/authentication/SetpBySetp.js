import React, { useState, useEffect } from 'react';

// material
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Stack } from '@mui/material';
import { styled } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack5';
import RegisterSummary from '../../components/authentication/company/RegisterSummary';
import RegisterPDVForm from '../../components/authentication/company/RegisterPDVForm';
import Page from '../../components/Page';
import useAuth from '../../hooks/useAuth';

// components
import RegisterCompanyForm from '../../components/authentication/company/RegisterCompanyForm';

const steps = ['Crear empresa', 'Puntos de venta', 'Resumen'];

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 900,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(6, 0)
}));

export default function SetpBySetp() {
  // Setp by step
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const { company, pdvCompany } = useAuth();

  const isStepOptional = (step) => step === 3;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    console.log('handleBack');
    console.log(activeStep);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [prevValues, setPrevValues] = useState({});
  const [preValuesPDV, setPreValuesPDV] = useState({});

  useEffect(() => {
    console.log('Esta es la empresa en el setp by setp');
    console.log(company);
    if (company && company.id) {
      setActiveStep(1);
      setPrevValues(company);
    }
  }, [company]);

  useEffect(() => {
    console.log('Este es el pdv en el step by step');
    if (pdvCompany) {
      setActiveStep(2);
      setPreValuesPDV(pdvCompany);
    }
  }, [pdvCompany]);

  // Logout
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  return (
    <RootStyle title="Register">
      <Container>
        <ContentStyle>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = <Typography variant="caption">Opcional</Typography>;
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }} justifyContent="flex-end">
              <Button size="small" variant="outlined" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </Stack>
            {activeStep === steps.length ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </>
            ) : null}
          </Box>
          {activeStep === 0 && (
            <RegisterCompanyForm
              prevValues={prevValues}
              setPrevValues={setPrevValues}
              nextStep={handleNext}
              activeStep={activeStep}
              handleBack={handleBack}
            />
          )}
          {activeStep === 1 && (
            <RegisterPDVForm
              setActiveStep={setActiveStep}
              prevValues={preValuesPDV}
              setPrevValues={setPreValuesPDV}
              nextStep={handleNext}
              activeStep={activeStep}
              handleBack={handleBack}
            />
          )}
          {activeStep === 2 && (
            <RegisterSummary nextStep={handleNext} activeStep={activeStep} handleBack={handleBack} />
          )}
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
