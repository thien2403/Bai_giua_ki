import { StyleSheet, View, Text, Image} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import React, {useEffect} from 'react';
import '@react-native-firebase/app';
import {login, useMyContextController} from '../store/Index';

function Login({navigation}) {
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;


  useEffect(() => {
    if (userLogin != null) {
      navigation.navigate('Home');
    }
  }, [navigation, userLogin]);

  const handleLogin = () => {
    let emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(password == '' || email == ''){
        setError('Thiếu thông tin')
      }else{
        if (!email.match(emailPattern)) {
          setError('Email không hợp lệ')}
          else login(dispatch, email, password);
      }
     
   
    
  };

  return (
    <View style={{ justifyContent: 'center', padding: 15}}>
       <Image
        source={require('../assets/firebase.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <TextInput
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        underlineColor="#f68405"
      />
      <TextInput
        secureTextEntry
        label={'Mật khẩu'}
        value={password}
        onChangeText={setpassword}
        style={styles.input}
        underlineColor="#f68405"
      />
      <Button
        style={{borderRadius: 0, backgroundColor: '#ffcd2e'}}
        mode="contained"
        onPress={handleLogin}>
        <Text style={{color: '#f68405' ,fontWeight:'bold'}}>Đăng nhập</Text>
      </Button>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Button
          style={{borderRadius: 0}}
          textColor="#f68405"
          onPress={() => navigation.navigate('Register')}>
          <Text style={{color: '#000'}}>Chưa có tài khoản ?</Text> Tạo ngay
        </Button>
      </View>
      {error && <HelperText style={{alignSelf:'center'}} type="error">{error}</HelperText>}
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginBottom:30
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});
