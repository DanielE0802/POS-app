import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Table,
  Stack,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer
} from '@material-ui/core';
// utils
import getColorName from '../../../../utils/getColorName';
import { fCurrency } from '../../../../utils/formatNumber';
//
import { MIconButton } from '../../../@material-extend';

// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 80, textAlign: 'right' }}>
      <IncrementerStyle>
        <MIconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Icon icon={minusFill} width={12} height={12} />
        </MIconButton>
        {quantity}
        <MIconButton size="small" color="inherit" onClick={onIncrease} disabled={quantity >= available}>
          <Icon icon={plusFill} width={12} height={12} />
        </MIconButton>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Disponible: {available}
      </Typography>
    </Box>
  );
}

POSProductList.propTypes = {
  formik: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func
};

export default function POSProductList({ formik, onDelete, onIncreaseQuantity, onDecreaseQuantity }) {
  // const { products } = formik.values;
  const products = [
    {
      id: 1,
      name: 'Nike Air Force 1 NDESTRUKT',
      size: 'US 10',
      price: 130,
      color: 'verde',
      cover: '/static/mock-images/products/product_1.jpg',
      quantity: 1,
      available: 5
    },
    {
      id: 2,
      name: 'Nike Zoom Double Stacked',
      size: 'US 9',
      price: 200,
      color: 'rojo',
      cover: '/static/mock-images/products/product_2.jpg',
      quantity: 3,
      available: 5
    }
  ];

  return (
    <TableContainer sx={{ minWidth: 500 }}>
      <Table>
        {/* <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Cantidad</TableCell>
            <TableCell align="right">Precio total</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead> */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Productos anadidos
        </Typography>
        <TableBody>
          {products.map((product) => {
            const { id, name, size, price, color, cover, quantity, available } = product;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 190, mb: 0.3 }}>
                        {name}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        divider={<Divider orientation="vertical" sx={{ height: 14, alignSelf: 'center' }} />}
                      >
                        <Typography variant="body2">
                          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                            size:&nbsp;
                          </Typography>
                          {size}
                        </Typography>

                        <Typography variant="body2">
                          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                            color:&nbsp;
                          </Typography>
                          {getColorName(color)}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">{fCurrency(price)}</TableCell>

                <TableCell align="left">
                  <Incrementer
                    quantity={quantity}
                    available={available}
                    onDecrease={() => onDecreaseQuantity(id)}
                    onIncrease={() => onIncreaseQuantity(id)}
                  />
                </TableCell>

                <TableCell align="right">{fCurrency(price * quantity)}</TableCell>

                {/* <TableCell align="right">
                  <MIconButton onClick={() => onDelete(id)}>
                    <Icon icon={trash2Fill} width={20} height={20} />
                  </MIconButton>
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}