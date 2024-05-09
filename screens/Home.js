import React, {useEffect, useLayoutEffect} from 'react';
import {View, FlatList} from 'react-native';
import {TextInput, Button, List} from 'react-native-paper';
import {addJob, logout, useMyContextController} from '../store/Index';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  const [newJob, setNewJob] = React.useState('');
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [listJob, setlistJob] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  const ref = firestore().collection('JOBS').orderBy('index', 'asc');

  useEffect(() => {
    if (userLogin == null) navigation.navigate('Login');
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, index} = doc.data();
        list.push({
          id: doc.id,
          index,
          title,
        });
      });
      setlistJob(list);
      AsyncStorage.getItem('index').then(value => {
        if (value !== null) {
          setIndex(parseInt(value));
        }
      });
    });
  }, [navigation, userLogin]);

  const handleLogout = () => {
    logout(dispatch);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button textColor="#000" onPress={handleLogout}>
          đăng xuất
        </Button>
      ),
    });
  });
  const handleAddJob = () => {
    const newIndex = index + 1;
    addJob(index, newJob);
    setIndex(newIndex);
    AsyncStorage.setItem('index', newIndex.toString());
    setNewJob('')
  };
  const renderItem = ({item}) => {
    return (
      <List.Item
        style={{backgroundColor:'gainsboro', borderWidth: 1, borderRadius:2, marginTop: 8}}
        title={item.index + '. ' + item.title}
      />
    );
  };
  return (
    <View style={{flex: 1, marginTop:5}}>
      <View style={{flexDirection: 'row', padding: 5, alignSelf:'center'}}>
        <TextInput
          label={'Thêm việc mới'}
          value={newJob}
          onChangeText={setNewJob}
          underlineColor="#fff"
          style={{width: 300, backgroundColor: '#fff'}}
        />
        <Button
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffcd2e',
            borderRadius: 12,
            marginLeft: 10
          }}
          mode="contained"
          onPress={handleAddJob}>
          Add
        </Button>
      </View>
      <FlatList
        style={{padding: 15}}
        data={listJob}
        keyExtractor={item => item.index}
        renderItem={renderItem}

      />
    </View>
  );
}

