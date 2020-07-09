import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/icons/logo.svg';
import Header from "../components/header"
import { NavigationScreenProp } from 'react-navigation';
//import CustomTask from "../components/costumtasks"

import { ToDo } from "../components/toDoList"
interface Props {
  navigation: NavigationScreenProp<any, any>;
}
export interface DataType {
  first: DataTypeItem
  second: Array<DataTypeItem>
  third: Array<DataTypeItem>
}
const tasks:DataType = {
  first: { count: true, value: "sasaawtbetabssasaawtbetabs" },
  second: [{ count: false, value: "sasaawtbetabssasaawtbetabs" }, { count: false, value: "sasaawtbetabssasaawtbetabs" }],
  third: [{ count: true, value: "sasaawtbetabssasaawtbetabs" }, { count: false, value: "sasaawtbetabssasaawtbetabs" }]
}
interface DataTypeItem {
  count: boolean,
  value: string,
}
export const MainTasks = (): React.ReactElement => {


  const [tasks, changeTasks] = useState([
    { count: true, value: "44444444444444444444444444" },
    { count: false, value: "sasaawtbetabssasaawtbetabs" },
    { count: false, value: "sasaawtbetabssasaawtbetabs" },
    { count: true, value: "sasaawtbetabssasaawtbetabs" },
    { count: false, value: "sasaawtbetabssasaawtbetabs" }]);

  function handleToDoValueChange(data: DataTypeItem): void {
    

    const array = tasks
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.value = data.value) {
        element.count = data.count
        
      }
    }
    changeTasks(array)
    console.log("***********************************", tasks);
  }
  const navigation = useNavigation();

  const onNavigateMenu = (): void => {
    navigation && navigation.navigate('MenuDrawer')
  };
  const onNAvigateReview = (): void => {
    navigation && navigation.navigate('DayReview')
  };
  const onNAvigateAddTask = (): void => {    
    navigation && navigation.navigate('AddTask')
  };
  return (
    <ScrollView style={{ backgroundColor: 'white', }}>
      <View style={styles.screen}>
        <Header text='Сегодня ' onPress={() => { onNavigateMenu() }} add={true} onHavigate={()=>{onNAvigateAddTask()}} />
        <View style={{ width: '100%' }}>

          <View style={{ backgroundColor: "#F2F3F8", }}>
            <View style={[styles.card, { marginTop: 7 }]} >
              <Text style={styles.titletext}>Основные задачи</Text>
              <Text style={styles.textComm}>Ваши главные задачи на сегодня</Text>
              <ToDo valueChanged={handleToDoValueChange} title={tasks[0].value} ischecked={tasks[0].count} count={1} />
            </View>
            <View style={styles.card} >
              <Text style={styles.titletext}>Второстепенные задач</Text>
              <Text style={styles.textComm}>Выполнили все основые? Не забудьте про эти!</Text>
              <ToDo valueChanged={handleToDoValueChange} title={tasks[1].value} ischecked={tasks[1].count} count={2} />
              <ToDo valueChanged={handleToDoValueChange} title={tasks[2].value} ischecked={tasks[2].count} count={3} />
            </View>
            <View style={styles.card} >
              <Text style={styles.titletext}>Дополнительно</Text>
              <Text style={styles.textComm}>Не откладывайте в долгий ящик</Text>
              <ToDo valueChanged={handleToDoValueChange} title={tasks[3].value} ischecked={tasks[3].count} count={4} />
              <ToDo valueChanged={handleToDoValueChange} title={tasks[4].value} ischecked={tasks[4].count} count={5} />
            </View>
          </View>

        </View>
        <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: 48 }}>
          <Button
            style={styles.button}
            onPress={onNAvigateReview}
          >
            <Text style={styles.buttonText}>Закончить</Text>
          </Button>
        </View>
        {/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor:'white'}}>
        <View style={{ height: 80, width: 80, borderColor: '#f2f2f2', borderWidth: 10, borderRadius: 50, marginTop:-30}}>
          <Button
            style={{ height: 59, width: 59, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', borderRadius: 50, }}
          ><Text style={{ fontSize: 35, color: 'white' }}>+</Text></Button>
          
        </View>
        <Button></Button>
      </View> */}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({

  titletext: {
    fontSize: 17,
    fontWeight: "600",
    color: '#363940'
  },
  checkbox: {
    alignSelf: "center",
    borderRadius: 20
  },
  card: {
    backgroundColor: 'white',
    width: "100%",
    paddingTop: 17,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    marginBottom: 5,
    paddingHorizontal: 23
  },
  textComm: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#9DA5B7'
  },
  textTask: {
    marginTop: 5,
    fontSize: 14,
  },
  screen: {
    //alignItems: 'center',

    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  button: {

    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 55,
    backgroundColor: '#3F93D9',
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 1.65,

    elevation: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});