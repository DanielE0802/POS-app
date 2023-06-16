import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import SetpBySetp from '../pages/authentication/SetpBySetp';
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuardStep.propTypes = {
  children: PropTypes.node
};

export default function GuestGuardStep({ children }) {
  const { isAuthenticated, isFirstLogin } = useAuth();
  console.log(isFirstLogin);

  if (isAuthenticated && isFirstLogin) {
    return <SetpBySetp />;
  }
  if (isAuthenticated && !isFirstLogin) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
