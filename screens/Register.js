/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Image} from 'react-native';
import {Button, Text, TextInput, HelperText} from 'react-native-paper';
import React from 'react';
import '@react-native-firebase/app';
import { signup } from '../store/Index';

function Register({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorPassword] = React.useState('');
  const [errorFullname, setErrorFullname] = React.useState('');
  const [confirmpassword, setConfirmpassword] = React.useState('');
  const [errorconfirmpassword, setErrorConfirmpassword] = React.useState('');


   
    const handleCreateAccount = () =>{
      let emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailPattern)) {
      setErrorEmail('Email không hợp lệ');
    } else if (fullname == '') {
      setErrorFullname('Chưa nhập tên');
    } else if (password.length < 6) {
      setErrorPassword('Mật khẩu từ 6 kí tự trở lên');
    } else if (confirmpassword != password) {
      setErrorConfirmpassword('Mật khẩu không khớp');
    } else {
      signup(email, password, fullname)
      navigation.navigate('Login')
    }

  };
  


  return (
    <View style={{justifyContent: 'center', padding: 15}}>
      <Image
        source={require('../assets/firebase.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TextInput
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        underlineColor="#f68405"
        style={styles.input}
      />
      {errorEmail && <HelperText type="error">{errorEmail}</HelperText>}
      <TextInput
        secureTextEntry
        label={'Password'}
        value={password}
        onChangeText={setpassword}
        underlineColor="#f68405"
        style={styles.input}
      />
      {errorPassword && <HelperText type="error">{errorPassword}</HelperText>}
      <TextInput
        label={'Full Name'}
        value={fullname}
        onChangeText={setFullname}
        underlineColor="#f68405"
        style={styles.input}
      />
      {errorFullname && <HelperText type="error">{errorFullname}</HelperText>}
      <TextInput
        secureTextEntry
        label={'Confirm Password'}
        value={confirmpassword}
        onChangeText={setConfirmpassword}
        underlineColor="#f68405"
        style={styles.input}
      />
      {errorconfirmpassword && (
        <HelperText type="error">{errorconfirmpassword}</HelperText>
      )}
      <Button
        style={{borderRadius: 0, backgroundColor: '#ffcd2e'}}
        mode="contained"
        textColor="#f68405"
        onPress={handleCreateAccount}>
        Tạo tài khoản
      </Button>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 50,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Button
          style={{borderRadius: 0}}
          textColor="#f68405"
          onPress={() => navigation.navigate('Login')}>
          <Text style={{color: '#000'}}>Đã có tài khoản </Text>
          Đăng nhập
        </Button>
      </View>
    </View>
  );
}
export default Register;
const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginBottom: 30,

  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
