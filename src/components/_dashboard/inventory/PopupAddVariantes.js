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
import { Box, InputAdornment, TextField, Stack, Link, Typography, Autocomplete, Divider } from '@material-ui/core';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { Link as RouterLink } from 'react-router-dom';
import SearchNotFound from '../../SearchNotFound';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function PopupAddVariantes() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([
    { title: 'Variante 1', id: 1 },
    { title: 'Variante 2', id: 2 },
    { title: 'Variante 3', id: 3 }
  ]);
  const [selectedVariant, setSelectedVariant] = React.useState([]);

  const handleChangeSearch = async (event, newValue) => {
    try {
      setSelectedVariant([...selectedVariant, newValue]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack>
      <Button variant="outlined" onClick={handleClickOpen}>
        Nueva variante
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>Variantes</DialogTitle>
        <Divider sx={{ mb: 3, mt: 0.5 }} />
        <DialogContent>
          <DialogContentText>{selectedVariant}</DialogContentText>
          <Autocomplete
            size="small"
            disablePortal
            popupIcon={null}
            options={searchResults}
            onInputChange={handleChangeSearch}
            getOptionLabel={(searchResults) => searchResults.title}
            noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Buscar variante..."
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
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
                      {params.InputProps.startAdornment}
                    </>
                  )
                }}
              />
            )}
            // renderOption={(props, option) => <li {...props}>{option.title}</li>}
            renderOption={(props, variant, { inputValue }) => {
              const { title } = variant;
              const matches = match(title, inputValue);
              const parts = parse(title, matches);
              return (
                <li {...props}>
                  {parts.map((part, index) => (
                    <Typography
                      key={index}
                      component="span"
                      variant="subtitle2"
                      color={part.highlight ? 'primary' : 'textPrimary'}
                    >
                      {part.text}
                    </Typography>
                  ))}
                </li>
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
