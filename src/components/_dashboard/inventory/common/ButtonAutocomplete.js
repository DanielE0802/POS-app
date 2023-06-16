import { Icon } from '@iconify/react';

const { Paper } = require('@material-ui/core');
const { Button } = require('@mui/material');

export const ButtonAutocomplete = ({ children, title, ...other }) => (
  <Paper {...other} style={{ paddingBottom: 40 }}>
    {console.log(title)}
    <Button
      fullWidth
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onClick={other.handleOnClick}
      type="button"
      style={{ position: 'absolute', bottom: 0, height: 40, borderRadius: 0 }}
    >
      {title}
      <Icon style={{ marginLeft: 10 }} icon="gala:add" width={18} height={18} />
    </Button>
    {children}
  </Paper>
);
