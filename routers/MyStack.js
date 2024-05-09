import {createStackNavigator} from '@react-navigation/stack';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import { useMyContextController } from '../store/Index';

const Stack = createStackNavigator();
const MyStack = ({navigation}) => {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;

  return (
    <Stack.Navigator initialRouteName="Login"
    v>
      <Stack.Screen name="Login" component={Login} options={{
          title: 'Login',
          headerTitleAlign: 'center',
        }} />
      <Stack.Screen name="Register" component={Register} options={{
          title: 'Register',
          headerTitleAlign: 'center',
        }}/>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: (userLogin != null )? userLogin.fullname : 'error',
          headerTitleAlign: 'center',
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};
export default MyStack;
