import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import jwt from 'jsonwebtoken';
import apiClient from '../api/axios';
import { isValidToken, setSession } from '../utils/jwt';
import RequestService from '../api/services/service';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve,
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        console.log(`access token${accessToken}`);

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const token = jwt.decode(accessToken);
          const userId = token.id;
          const user = RequestService.fetchGetUserById({ id: userId });
          // const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await RequestService.fetchLoginUser({
      databody: {
        email,
        password
      }
    });
    console.log(response);
    // const { accessToken, user } = response.data;
    const accessToken = response.data;
    const user = {
      id: 1,
      displayName: 'admin',
      email: 'soporte@gmail.com',
      password: 'admin',
      photoURL: 'https://i.pravatar.cc/300',
      phoneNumber: null,
      country: null,
      address: null
    };

    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const register = async (email, password, firstName, lastName, dni, tel) => {
    const dniString = dni.toString();
    const response = await RequestService.fetchRegisterUser({
      databody: {
        email,
        password,
        profile: {
          name: firstName,
          lastname: lastName,
          phone: tel,
          dni: dniString
        }
      }
    });
    // TODO: Cuando se registre me tiene que devolver el accessToken

    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
