import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Box } from '@material-ui/core';
import POScontainer from '../../components/_dashboard/POS/POScontainer';
import useSettings from '../../hooks/useSettings';
import { getProducts } from '../../redux/slices/product';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import Page from '../../components/Page';

function POS() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Inventario: Productos">
      <Container sx={{ paddingTop: 2 }} maxWidth={themeStretch ? false : 'lg'}>
        <Box>
          {/* <HeaderBreadcrumbs
            heading="Venta POS"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'POS',
                href: PATH_DASHBOARD.POS.sale
              },
              { name: 'Venta' }
            ]}
            action={
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.inventory.newProduct}
                startIcon={<Icon icon={plusFill} />}
              >
                Nueva venta
              </Button>
            }
          /> */}
          <POScontainer />
        </Box>
      </Container>
    </Page>
  );
}

export default POS;
