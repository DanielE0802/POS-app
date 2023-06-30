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
  isFirstLogin: true,
  isInitialized: false,
  user: null,
  company: null,
  pdvCompany: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      isFirstLogin: user?.isFirstLogin,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      isFirstLogin: user.isFirstLogin,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    company: null,
    pdvCompany: null
  }),
  REGISTER: (state, action) => ({
    ...state,
    isAuthenticated: false
  }),
  UPDATE_COMPANY: (state, action) => {
    const { company } = action.payload;
    return {
      ...state,
      company
    };
  },
  UPDATE_PDV: (state, action) => {
    const { pdvCompany } = action.payload;
    return {
      ...state,
      pdvCompany
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve,
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
  updateCompany: () => Promise.resolve(),
  updatePDV: () => Promise.resolve()
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

        if (accessToken) {
          setSession(accessToken);
          const token = jwt.decode(accessToken);
          const userId = token.id;
          const user = (await RequestService.fetchGetUserById({ id: userId })).data;
          state.user = user;
          console.log(user);
          console.log(token);

          if (user.profile?.company?.id) {
            const company = (await RequestService.getCompanyById(user.profile?.company?.id, true)).data;
            const Setcompany = company;

            dispatch({
              type: 'UPDATE_COMPANY',
              payload: {
                company: Setcompany
              }
            });

            if (company.pdvs?.length > 0) {
              const SetpdvCompany = company.pdvs;
              dispatch({
                type: 'UPDATE_PDV',
                payload: {
                  pdvCompany: SetpdvCompany
                }
              });
            } else {
              dispatch({
                type: 'UPDATE_PDV',
                payload: {
                  pdvCompany: null
                }
              });
            }
          }

          console.log(state);

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              isFirstLogin: user.isFirstLogin,
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
    setSession(response.data);
    // Set user to redux
    const token = jwt.decode(response.data);
    const user = (await RequestService.fetchGetUserById({ id: token.id })).data;

    if (user.profile?.company?.id) {
      const company = (await RequestService.getCompanyById(user.profile?.company?.id, true)).data;
      const Setcompany = company;

      dispatch({
        type: 'UPDATE_COMPANY',
        payload: {
          company: Setcompany
        }
      });

      if (company.pdvs?.length > 0) {
        const SetpdvCompany = company.pdvs;
        dispatch({
          type: 'UPDATE_PDV',
          payload: {
            pdvCompany: SetpdvCompany
          }
        });
      } else {
        dispatch({
          type: 'UPDATE_PDV',
          payload: {
            pdvCompany: null
          }
        });
      }
    }

    dispatch({
      type: 'LOGIN',
      payload: {
        isFirstLogin: user.isFirstLogin,
        user
      }
    });
  };

  const register = async (email, password, firstName, lastName, dni, tel) => {
    const dniString = dni.toString();
    const response = await RequestService.fetchRegisterUser({
      databody: {
        password,
        profile: {
          name: firstName,
          lastname: lastName,
          email,
          phone: `+${tel}`,
          dni: dniString,
          company: { id: null },
          photo:
            'https://img.freepik.com/foto-gratis/hombre-pelo-corto-traje-negocios-que-lleva-dos-registros_549566-318.jpg'
        }
      }
    });

    dispatch({
      type: 'REGISTER'
    });
    return response;
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = async (id, databody) => {
    await RequestService.updateUser({ id, databody });
    const user = (await RequestService.fetchGetUserById({ id })).data;
    dispatch({
      type: 'LOGIN',
      payload: {
        isFirstLogin: user.isFirstLogin,
        user
      }
    });
  };

  const updateCompany = async (databody) => {
    const response = await RequestService.updateCompany({ databody, id: state.company.id });
    dispatch({
      type: 'UPDATE_COMPANY',
      payload: {
        company: response.data
      }
    });
  };

  const updatePDV = async (pdvCompany) => {
    dispatch({
      type: 'UPDATE_PDV',
      payload: {
        pdvCompany
      }
    });
  };

  const createCompany = async ({ databody }) => {
    const accessToken = window.localStorage.getItem('accessToken');
    const token = jwt.decode(accessToken);
    const response = await RequestService.createCompany({ databody });
    await RequestService.updateProfile({
      id: state.user.profile?.id,
      databody: { company: { id: response.data.id } }
    });
    const user = (await RequestService.fetchGetUserById({ id: token.id })).data;
    state.user = user;

    dispatch({
      type: 'UPDATE_PDV',
      payload: {
        pdvCompany: null
      }
    });

    dispatch({
      type: 'UPDATE_COMPANY',
      payload: {
        company: response.data
      }
    });
  };

  const createPDV = async (databody) => {
    const response = await RequestService.createPDV({ databody });
    dispatch({
      type: 'UPDATE_PDV',
      payload: {
        pdvCompany: response.data
      }
    });
  };

  // const validateCompanyAndPDV = async () => {
  //   const pdvs = (await RequestService.getCompanies(true)).data;
  //   const company = pdvs.filter((pdv) => pdv.id === state.user.profile?.company?.id);
  //   state.company = company;
  //   if (company[0].pdvs?.length > 0) {

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
        updateCompany,
        updatePDV,
        createCompany,
        createPDV
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
