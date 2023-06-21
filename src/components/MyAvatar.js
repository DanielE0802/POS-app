// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();
  const avatarSrc = user.profile?.photo ? user.profile.photo : 'user.png';
  return (
    <MAvatar
      src={avatarSrc}
      alt={user.displayName}
      color={user.profile?.photo ? 'default' : createAvatar(user.displayName).color}
      {...other}
    >
      {createAvatar(user.displayName).name}
    </MAvatar>
  );
}
