import { Icon } from '@iconify/react';
import { Tooltip, Zoom } from '@material-ui/core';
import React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { styled } from '@mui/material/styles';

const CustomWidthTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .MuiTooltip-tooltip`]: {
    maxWidth: 200,
    lineHeight: '14px',
    textWrap: 'balance',
    textAlign: 'center'
  }
});

function CustomTooltip({ title }) {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {/* TODO: corregir al dar click por fuera no se cierra */}
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <CustomWidthTooltip
          arrow
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          PopperProps={{
            disablePortal: true
          }}
          TransitionComponent={Zoom}
          title={title}
        >
          <Icon
            style={{ cursor: 'pointer' }}
            width={18}
            height={18}
            onClick={handleTooltipOpen}
            icon="material-symbols:help-outline"
          />
        </CustomWidthTooltip>
      </ClickAwayListener>
    </>
  );
}

export default CustomTooltip;
