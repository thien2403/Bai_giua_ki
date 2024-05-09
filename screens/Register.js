import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Button, Text, TextInput, HelperText} from 'react-native-paper';
import React from 'react';
import '@react-native-firebase/app';
import {signup} from '../store';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Register({navigation}) {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPass, setErrorPass] = React.useState('');
  const [errorFullname, setErrorFullname] = React.useState('');
  const [confirmpass, setConfirmpass] = React.useState('');
  const [errorconfirmpass, setErrorConfirmpass] = React.useState('');
  const handleCreateAccount = () => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEmail)) {
      setErrorEmail('Invalid Email Address');
    } else if (fullname === '') {
      setErrorFullname('Invalid fullname');
    } else if (pass.length < 6) {
      setErrorPass('Password need 6 keywords or more');
    } else if (confirmpass !== pass) {
      setErrorConfirmpass('Dont match');
    } else signup(email, pass, fullname);
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
          <Image
            source={require('../assets/images.png')}
            style={styles.image}
          />
          <TextInput
            style={styles.input}
            placeholder='Full Name'
            placeholderTextColor="#aaaaaa"
            value={fullname}
            onChangeText={setFullname}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          {errorFullname && <HelperText type="error">{errorFullname}</HelperText>}
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor="#aaaaaa"
            value={email}
            onChangeText={setEmail}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          {errorEmail && <HelperText type="error">{errorEmail}</HelperText>}
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
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder='Confirm Password'
            value={confirmpass}
            onChangeText={setConfirmpass}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          {errorconfirmpass && (
            <HelperText type="error">{errorconfirmpass}</HelperText>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateAccount}>
              <Text style={styles.buttonTitle}>Create account</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>Already got an account?
              <Text onPress={() => navigation.navigate('Login')} style={styles.footerLink}> Login</Text>
            </Text>
          </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
export default Register;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30
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