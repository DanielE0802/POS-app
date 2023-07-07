import PropTypes from 'prop-types';
// material
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
// hooks
import { esES } from '@material-ui/data-grid';
// import useLocales from '../hooks/useLocales';

// ----------------------------------------------------------------------

ThemeLocalization.propTypes = {
  children: PropTypes.node
};

export default function ThemeLocalization({ children }) {
  const defaultTheme = useTheme();
  // const { currentLang } = useLocales();

  const theme = createTheme(defaultTheme, esES);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
