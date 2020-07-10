import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { storeData, getData } from "../api/api"
import Logo from '../assets/icons/logo.svg';
import Header from "../components/header"
import { NavigationScreenProp } from 'react-navigation';
//import CustomTask from "../components/costumtasks"
import { AsyncStorage } from 'react-native';

import { ToDo } from "../components/toDoList"
import { Value } from 'react-native-reanimated';
interface Props {
  navigation: NavigationScreenProp<any, any>;
  // tasks:DataTypeItem[]
}
export interface DataType {
  first: DataTypeItem
  second: DataTypeItem[]
  third: DataTypeItem[]
}
// const tasks:DataType = {
//   first: { count: true, value: "sasaawtbetabssasaawtbetabs" },
//   second: [{ count: false, value: "sasaawtbetabssasaawtbetabs" }, { count: false, value: "sasaawtbetabssasaawtbetabs" }],
//   third: [{ count: true, value: "sasaawtbetabssasaawtbetabs" }, { count: false, value: "sasaawtbetabssasaawtbetabs" }]
// }
interface DataTypeItem {
  count: boolean,
  value: string,
  title: string,
}
interface IState {
  todaytasks: DataTypeItem[],
  isStart:boolean

}

class MainTasks extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      todaytasks: [],
      isStart:false
    }
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something
      this.setData()
    });
  }
  // componentDidMount(){
  //   this.setData()

  // }
  setData = async (): Promise<void> => {
    const data = await getData('tasks')
    if (data == null) {
      
      storeData('tasks', [])
    } else {
      
      if(data.length==5){
        this.setState({isStart:true})
      }
      this.setState({ todaytasks: data })
    }
  };
  onNavigateMenu = (): void => {
    this.props.navigation.navigate('MenuDrawer')
  };
  onNavigateToDoTask = (): void => {
    if (this.state.isStart) {
      this.props.navigation.navigate('ToDoTask')
    } 
    
  };
  onNAvigateAddTask = (): void => {
    this.props.navigation.navigate('AddTask', { key: 1 })
  };
  render() {
    console.log(",,,,", this.state.isStart);

    return (
      <ScrollView style={{ backgroundColor: 'white', }}>
        <View style={styles.screen}>
          <Header text='Сегодня ' onPress={() => { this.onNavigateMenu }} add={!this.state.isStart} onNavigate={() => { this.onNavigateMenu }} />
          <View style={{ width: '100%' }}>
            <View style={{ backgroundColor: "#F2F3F8", }}>
              {this.state.todaytasks && this.state.todaytasks[0] ?
                <View style={[styles.card, { marginTop: 7 }]} >
                  <Text style={styles.titletext}>Основные задачи</Text>
                  <Text style={styles.textComm}>Ваши главные задачи на сегодня</Text>
                  <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('EditTask', { comment: this.state.todaytasks[0].value, title: this.state.todaytasks[0].title, index: 0 }) }}
                  >
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                      <Text style={styles.textTask}>1.{this.state.todaytasks[0].title} </Text>
                    </View>
                  </TouchableOpacity>

                </View> : null}
              {this.state.todaytasks[1] ?
                <View style={styles.card} >
                  <Text style={styles.titletext}>Второстепенные задач</Text>
                  <Text style={styles.textComm}>Выполнили все основые? Не забудьте про эти!</Text>
                  <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('EditTask', { comment: this.state.todaytasks[1].value, title: this.state.todaytasks[1].title, index: 1 }) }}
                  >
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                      <Text style={styles.textTask}>2.{this.state.todaytasks[1].title} </Text>
                    </View>
                  </TouchableOpacity>

                  {this.state.todaytasks[2] ?
                    <TouchableOpacity
                      onPress={() => { this.props.navigation.navigate('EditTask', { comment: this.state.todaytasks[2].value, title: this.state.todaytasks[2].title, index: 2 }) }}
                    >
                      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <Text style={styles.textTask}>3.{this.state.todaytasks[2].title} </Text>
                      </View></TouchableOpacity> : null}
                </View> : null}
              {this.state.todaytasks[3] ?
                <View style={styles.card} >
                  <Text style={styles.titletext}>Дополнительно</Text>
                  <Text style={styles.textComm}>Не откладывайте в долгий ящик</Text>
                  <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('EditTask', { comment: this.state.todaytasks[3].value, title: this.state.todaytasks[3].title, index: 3 }) }}
                  >
                    <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                      <Text style={styles.textTask}>4.{this.state.todaytasks[3].title} </Text>
                    </View>
                  </TouchableOpacity>
                  {this.state.todaytasks[4] ?
                    <TouchableOpacity
                      onPress={() => { this.props.navigation.navigate('EditTask', { comment: this.state.todaytasks[4].value, title: this.state.todaytasks[4].title, index: 4 }) }}
                    >
                      <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <Text style={styles.textTask}>5.{this.state.todaytasks[4].title} </Text>
                      </View></TouchableOpacity> : null}
                </View> : null}

            </View>

          </View>
          <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: 48 }}>
            <Button
            disabled={!this.state.isStart}
              style={styles.button}
              onPress={this.onNavigateToDoTask}
            >
              <Text style={styles.buttonText}>Начать</Text>
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
  }
};

export default MainTasks
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