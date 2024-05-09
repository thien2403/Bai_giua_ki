import React, {useEffect, useLayoutEffect} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput, Button, List, Text} from 'react-native-paper';
import {addJod, logout, useMyContextController} from '../store';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  const [newJob, setNewJob] = React.useState('');
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [jobLst, setJobLst] = React.useState([]);
  const [jobId, setJobId] = React.useState(0);
  const ref = firestore().collection('JOBS').orderBy('idJob', 'asc');
  useEffect(() => {
    if (userLogin == null) navigation.navigate('Login');
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, idJob} = doc.data();
        list.push({
          id: doc.id,
          idJob,
          title,
        });
      });
      setJobLst(list);
      AsyncStorage.getItem('jobId').then(value => {
        if (value !== null) {
          setJobId(parseInt(value));
        }
      });
    });
  }, [navigation, userLogin]);

  const handleLogout = () => {
    logout(dispatch);
  };

  const Divider = () => {
    return <View style={styles.divider} />;
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button textColor="#000" onPress={handleLogout}>
          Logout
        </Button>
      ),
    });
  });
  const handleAddJob = () => {
    const nextJobId = jobId + 1;

    addJod(jobId, newJob);

    setJobId(nextJobId);
    AsyncStorage.setItem('jobId', nextJobId.toString());
  };
  const renderItem = ({item}) => {
    return (
      <List.Item
        titleStyle={{fontSize: 20}}
        title={item.idJob + '. ' + item.title}
      />
    );
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add new job'
          placeholderTextColor="#aaaaaa"
          value={newJob}
          onChangeText={setNewJob}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddJob}>
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={jobLst}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: 'grey',
  },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
      height: 48,
      borderRadius: 5,
      overflow: 'hidden',
      backgroundColor: 'white',
      paddingLeft: 16,
      flex: 1,
      marginRight: 5
  },
  button: {
      height: 47,
      borderRadius: 5,
      backgroundColor: '#788eec',
      width: 80,
      alignItems: "center",
      justifyContent: 'center'
  },
  buttonText: {
      color: 'white',
      fontSize: 16
  },
  listContainer: {
      marginTop: 20,
      padding: 20,
  },
});