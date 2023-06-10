import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import match from 'autosuggest-highlight/match';
import Slide from '@mui/material/Slide';
import parse from 'autosuggest-highlight/parse';
import {
  Box,
  InputAdornment,
  TextField,
  Stack,
  Link,
  Typography,
  Autocomplete,
  Divider,
  Grid
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchNotFound from '../../SearchNotFound';
import PopupCreateWarehouse from './product-list/warehouses/popupCreateWarehouse';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function PopupAssingInventory({
  handleAssignInventory,
  open,
  handleClose,
  handleClickOpen,
  warehouseEdit
}) {
  const [openCreateWarehouse, setOpenCreateWarehouse] = React.useState(false);
  const handleClickOpenCreateWarehouse = () => {
    setOpenCreateWarehouse(true);
    handleClose();
  };

  const handleCloseCreateWarehouse = () => {
    setOpenCreateWarehouse(false);
    handleClickOpen();
  };

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([
    { title: 'Principal', id: 0 },
    { title: 'Cali', id: 1 },
    { title: 'Palmira', id: 2 },
    { title: 'Pereira', id: 3 }
  ]);

  const [selectedOption, setSelectedOption] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [minQuantity, setMinQuantity] = React.useState('');

  const handleOptionSelect = (event, option) => {
    setSelectedOption(option);
  };

  React.useEffect(() => {
    console.log(selectedOption);
    console.log(quantity);
    console.log(minQuantity);
  }, [selectedOption, quantity, minQuantity]);

  useEffect(() => {
    setSelectedOption(warehouseEdit ? { title: warehouseEdit.title, id: warehouseEdit.id } : null);
    setQuantity(warehouseEdit ? warehouseEdit.quantity : null);
    setMinQuantity(warehouseEdit ? warehouseEdit.minQuantity : null);
  }, [warehouseEdit]);

  const submitForm = (e) => {
    e.preventDefault();
    handleClose();
    handleAssignInventory(selectedOption, quantity, minQuantity);
  };

  const handleInputChange = (event, value) => {
    setSearchQuery(value);
  };

  const isOptionEqualToValue = (option, value) => {
    if (option && value) {
      return option.id === value.id && option.title === value.title;
    }
    return false;
  };

  return (
    <Stack>
      <Button variant="outlined" sx={{ mt: 3 }} onClick={handleClickOpen}>
        Agregar punto de venta
        <Icon style={{ marginLeft: 10 }} icon="gala:add" width={18} height={18} />
      </Button>
      <Dialog maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Seleccionar Punto De Venta</DialogTitle>
        <Button
          sx={{ position: 'absolute', right: 8, height: 50, top: 8, borderRadius: '100%', width: 50, minWidth: 50 }}
          onClick={handleClose}
        >
          <Icon width={24} height={24} icon="ion:close" />
        </Button>
        <Divider sx={{ mb: 0.5, mt: 2 }} />
        <DialogContent>
          <Autocomplete
            fullWidth
            disablePortal
            value={selectedOption}
            getOptionLabel={(option) => option.title}
            options={searchResults}
            inputValue={searchQuery}
            onInputChange={handleInputChange}
            onChange={handleOptionSelect}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Punto de venta"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component={Icon}
                        icon={searchFill}
                        sx={{
                          ml: 1,
                          width: 20,
                          height: 20,
                          color: 'text.disabled'
                        }}
                      />
                    </InputAdornment>
                  )
                }}
              />
            )}
            renderOption={(props, option) => {
              const matches = match(option.title, searchQuery);
              const parts = parse(option.title, matches);

              return (
                <li {...props}>
                  <Link onClick={() => handleOptionSelect(option)} to="#" underline="none">
                    <Box sx={{ typography: 'body2', display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.primary">
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{
                              fontWeight: part.highlight ? 700 : 400
                            }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </Typography>
                    </Box>
                  </Link>
                </li>
              );
            }}
            ListboxComponent={(props) => (
              <ul
                {...props}
                style={{
                  maxHeight: 200, // Ajusta la altura máxima del menú desplegable según tus necesidades
                  overflowY: 'auto' // Agrega desplazamiento vertical si el contenido excede la altura máxima
                }}
              >
                {props.children}
                <li>
                  <Button fullWidth onClick={handleClickOpenCreateWarehouse}>
                    Agregar punto de venta
                    <Icon style={{ marginLeft: 10 }} icon="gala:add" width={18} height={18} />
                  </Button>
                </li>
              </ul>
            )}
            noOptionsText={
              <>
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, px: 1 }}>
                  No se encontraron resultados a la búsqueda "{searchQuery}"
                </Typography>
                <Button fullWidth onClick={handleClickOpenCreateWarehouse}>
                  Agregar punto de venta
                  <Icon style={{ marginLeft: 10 }} icon="gala:add" width={18} height={18} />
                </Button>
              </>
            }
          />
          <Stack direction="row" sx={{ marginTop: 3 }} spacing={2}>
            <TextField
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              label="Cantidad"
              variant="outlined"
            />
            <TextField
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
              fullWidth
              label="Cantidad mínima"
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={submitForm}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <PopupCreateWarehouse handleClose={handleCloseCreateWarehouse} open={openCreateWarehouse} />
    </Stack>
  );
}

PopupAssingInventory.propTypes = {
  handleAssignInventory: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleClickOpen: PropTypes.func,
  warehouseEdit: PropTypes.object
};
