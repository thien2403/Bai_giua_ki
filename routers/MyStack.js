import {createStackNavigator} from '@react-navigation/stack';
import {useMyContextController} from '../store';
import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'

const Stack = createStackNavigator();
const MyStack = ({navigation}) => {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleStyle: {fontStyle: 'italic'},
          title: 'Hello ' + (userLogin != null && userLogin.fullname),
          headerTitleAlign: 'center',
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
};
export default MyStack;