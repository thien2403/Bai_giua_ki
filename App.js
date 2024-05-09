import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './routers/MyStack';
import { MyContextControllerProvider } from './store/Index';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <MyContextControllerProvider>
          <NavigationContainer>
            <MyStack/>
          </NavigationContainer>
      </MyContextControllerProvider>
    </View>
  );
};
export default App;