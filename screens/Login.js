import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, {useEffect} from 'react';
import '@react-native-firebase/app';
import {login, useMyContextController} from '../store';

function Login({navigation}) {
  const [controller, dispatch] = useMyContextController();
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const {userLogin} = controller;
  const [error, setError] = React.useState('');
  const [errorPass, setErrorPass] = React.useState('');

  useEffect(() => {
    if (userLogin != null) {
      navigation.navigate('Home');
    }
    console.log(userLogin);
  }, [navigation, userLogin]);

  const handleLogin = () => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEmail)) {
      setError('Invalid Email Address');
    } else if (pass.length < 6) {
      setErrorPass('Password need 6 keywords or more');
    } else login(dispatch, email, pass);
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <KeyboardAwareScrollView
        style={{flex:1, width:'100%'}}
        keyboardShouldPersistTaps="always">
          <Image
            style={styles.image}
            source={require('../assets/images.png')}
          />
          <TextInput
            style={styles.input}
            placeholder='E-mail'
            placeholderTextColor="#aaaaaa"
            value={email}
            onChangeText={setEmail}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          {error && <HelperText type="error">{error}</HelperText>}
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder='Password'
            value={pass}
            onChangeText={setPass}
            underlineColorAndroid="transparent"
            autoCapitalize="none"          
          />
          {errorPass && <HelperText type="error">{errorPass}</HelperText>}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}>
            <Text style={styles.buttonTitle}>Login</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>Don't have an account? 
              <Text onPress={() => navigation.navigate('Register')} style={styles.footerLink}> Sign up</Text>
            </Text>
          </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  image: {
    flex:1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin:30
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
      fontSize: 16,
      color: '#2e2e2d'
  },
  footerLink: {
      color: "#788eec",
      fontWeight: "bold",
      fontSize: 16
  }
});