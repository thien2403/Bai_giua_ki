import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './routers/MyStack';
import {MyContextControllerProvider} from './store';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <MyContextControllerProvider>
        <PaperProvider>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </PaperProvider>
      </MyContextControllerProvider>
    </View>
  );
};
export default App;