import {createContext, useContext, useMemo, useReducer} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

const MyContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      return {...state, userLogin: action.value};
    }
    case 'USER_LOGOUT': {
      return {...state, userLogin: null};
    }
    case 'FETCH_JOB': {
      return {...state, job: action.value};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const MyContextControllerProvider = ({children}) => {
  const initialState = {
    userLogin: null,
    job: [],
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

const useMyContextController = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      'useMyContextController should be used inside the MyContextControllerProvider',
    );
  }
  return context;
};

const USERS = firestore().collection('USERS');
const JOBS = firestore().collection('JOBS');

const signup = (
  email,
  password,
  fullname,
) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert('Tạo tài khoản ' + email + ' thành công');
      USERS.doc(email).set({
        email,
        password,
        fullname,
      });
    })
    .catch(e => console.log(e.message));
};

const login = (dispatch, email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      USERS.doc(email).onSnapshot(u => {
        if (u.exists) {
          Alert.alert('Đăng nhập thành công: ' + u.id);
          dispatch({type: 'USER_LOGIN', value: u.data()});
        }
      });
    })
    .catch(e => Alert.alert('Sai tài khoản hoặc mật khẩu'));
};
const logout = dispatch => {
  auth()
    .signOut()
    .then(() => dispatch({type: 'USER_LOGOUT'}));
};

const addJob = (index, newJob) => {
  JOBS.add({index: index, title: newJob})
    .then(() => console.log('Thêm thành công: ' + newJob))
    .catch(e => console.log(e.message));
};

export {
  MyContextControllerProvider,
  useMyContextController,
  login,
  logout,
  signup,
  addJob,
};