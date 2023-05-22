import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
  Tooltip,
  Button
} from '@material-ui/core';
import Zoom from '@mui/material/Zoom';
// ----------------------------------------------------------------------

// states

import { useDispatch } from 'react-redux';
import { switchPopupState } from '../redux/slices/categories';
import { switchPopupWarehouses } from '../redux/slices/warehouses';

const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    color: theme.palette.text.primary
  })
);

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main
  }
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  active: PropTypes.func,
  isShow: PropTypes.bool,
  item: PropTypes.object
};

function NavItem({ item, active, isShow }) {
  const theme = useTheme();
  const isActiveRoot = active(item.path);
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(isActiveRoot);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    '&:before': { display: 'block' }
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium'
  };

  const handlePopupCategory = () => {
    dispatch(switchPopupState());
  };

  const handlePopupWarehouse = () => {
    dispatch(switchPopupWarehouses());
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle)
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

          {isShow && (
            <>
              <ListItemText disableTypography primary={title} />
              {info && info}
              <Box
                component={Icon}
                icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                sx={{ width: 16, height: 16, ml: 1 }}
              />
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item) => {
                const { title, path } = item;
                const isActiveSub = active(path);

                return (
                  <ListItemStyle
                    key={title}
                    component={RouterLink}
                    to={path}
                    sx={{
                      ...(isActiveSub && activeSubStyle)
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 0,
                          height: 0,
                          display: 'flex',
                          borderRadius: '8px',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '-20px',
                          bgcolor: 'text.disabled',
                          transition: (theme) => theme.transitions.create('transform'),
                          ...(isActiveSub && {
                            bgcolor: 'primary.main',
                            width: 3.5,
                            height: 12
                          })
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                    {item.add ? (
                      typeof item.add === 'boolean' ? (
                        // Category use create popup

                        <>
                          {item.path.includes('categories') && (
                            <Button
                              component={RouterLink}
                              // width={20}
                              to={path}
                              onClick={handlePopupCategory}
                              variant="text"
                              color="primary"
                              sx={{ minWidth: 0 }}
                            >
                              <Tooltip TransitionComponent={Zoom} title="Crear" placement="right" arrow>
                                <Icon icon="gala:add" width={18} height={18} />
                              </Tooltip>
                            </Button>
                          )}
                          {item.path.includes('warehouses') && (
                            <Button
                              component={RouterLink}
                              // width={20}
                              to={path}
                              onClick={handlePopupWarehouse}
                              variant="text"
                              color="primary"
                              sx={{ minWidth: 0 }}
                            >
                              <Tooltip TransitionComponent={Zoom} title="Crear" placement="right" arrow>
                                <Icon icon="gala:add" width={18} height={18} />
                              </Tooltip>
                            </Button>
                          )}
                        </>
                      ) : (
                        <Button
                          component={RouterLink}
                          // width={20}
                          to={item.add}
                          variant="text"
                          color="primary"
                          sx={{ minWidth: 0 }}
                        >
                          <Tooltip TransitionComponent={Zoom} title="Crear" placement="right" arrow>
                            <Icon href={item.add} icon="gala:add" width={18} height={18} />
                          </Tooltip>
                        </Button>
                      )
                    ) : null}
                  </ListItemStyle>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      {isShow && (
        <>
          <ListItemText disableTypography primary={title} />
          {info && info}
        </>
      )}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  isShow: PropTypes.bool,
  navConfig: PropTypes.array
};

export default function NavSection({ navConfig, isShow = true, ...other }) {
  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { subheader, items } = list;
        return (
          <List key={subheader} disablePadding>
            {isShow && <ListSubheaderStyle>{subheader}</ListSubheaderStyle>}
            {items.map((item) => (
              <NavItem key={item.title} item={item} active={match} isShow={isShow} />
            ))}
          </List>
        );
      })}
    </Box>
  );
}
