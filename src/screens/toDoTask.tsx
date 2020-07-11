import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import { Button, Thumbnail } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { storeData, getData } from "../api/api"

import Logo from '../assets/icons/logo.svg';
import Header from "../components/Header"
import { NavigationScreenProp } from 'react-navigation';
//import CustomTask from "../components/costumtasks"
import moment from "moment";

import { ToDo } from "../components/ToDoList"
import { exp, concat } from 'react-native-reanimated';
interface Props {
  navigation: NavigationScreenProp<any, any>;
}
export interface DataType {
  first: DataTypeItem
  second: DataTypeItem[]
  third: DataTypeItem[]
}
interface DataTypeItem {
  count: boolean,
  value: string,
  title: string
}
interface IState {
  tasks: DataTypeItem[],
  isFinished: boolean,
  cancheck:boolean,
  time:string
}
//export const ToDoTask = (): React.ReactElement => {
class ToDoTask extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      tasks: [],
      isFinished: false,
      cancheck:true,
      time:moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD')
    }
    const unsubscribe = props.navigation.addListener('focus', () => {
      // do something

      this.setData()

    });
  }

  handleToDoValueChange(res: DataTypeItem): void {
    const time = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD')
    getData(this.state.time).then((data) => {
      if (data != null) {
        let finish = true
        for (let index = 0; index < data.tasks.length; index++) {
          const element = data.tasks[index];
          console.log("==================", element, res);

          if (element.title == res.value) {


            element.count = !res.count
            break
          }
        }


        storeData(this.state.time, data)
      }
    })

  }
  ckeckisfinished() {
    const time = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD')
      console.log("::::::::::::",this.state.time);
      
    getData(this.state.time).then((data) => {
      let finish = true
      for (let index = 0; index < data.tasks.length; index++) {
        const element = data.tasks[index];
        if (!element.count) {

          finish = false
          break
        }
      }
      if (finish) {
        console.log("finishshshshshhshshsh");

        // data.isfinished = true
        //  storeData(time, data).then(()=>{
        this.props.navigation.navigate('DayReview')
        // })

      }

    })
  }

  setData = async (): Promise<void> => {
    const time = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD')
    const data = await getData(time)

    if (data != null) {
      console.log('dattaaaa', data);
      if (data.isfinished) {
        const tim = moment().add(1, 'days').utcOffset('+05:30')
          .format('YYYY-MM-DD')
        const tommorowTasks = await getData(tim)
        this.setState({
          tasks: tommorowTasks.tasks,
          cancheck:false,
          time:tim
        })
      }else{
        console.log("kfhslkdfjlsodkgjdskgj");
        
        this.setState({
          tasks: data.tasks,
  
        })
      }
      // return data
      // changeTasks(arr)
     

    }
  };

  render() {
    console.log(":::", this.state.isFinished);
    return (


      <ScrollView style={{ backgroundColor: 'white', }}>
        <View style={styles.screen}>
          <Header text='Сегодня ' onPress={() => { }} add={false} onNavigate={() => { }} />
          <View style={{ width: '100%' }}>
            {/* {this.renderItem(this.state.tasks)} */}

            <View style={{ backgroundColor: "#F2F3F8", }}>
              {this.state.tasks && this.state.tasks[0] ? <View style={[styles.card, { marginTop: 7 }]}  >
                <Text style={styles.titletext}>Основные задачи</Text>
                <Text style={styles.textComm}>Ваши главные задачи на сегодня</Text>
                <ToDo valueChanged={this.handleToDoValueChange} title={this.state.tasks[0].title} count={this.state.tasks[0].count} num={1} cancheck={this.state.cancheck} />
              </View> : null}
              {this.state.tasks && this.state.tasks[1] ? <View style={styles.card} >
                <Text style={styles.titletext}>Второстепенные задач</Text>
                <Text style={styles.textComm}>Выполнили все основые? Не забудьте про эти!</Text>
                <ToDo valueChanged={this.handleToDoValueChange} title={this.state.tasks[1].title} count={this.state.tasks[1].count} num={2} cancheck={this.state.cancheck} />
                {this.state.tasks && this.state.tasks[2] ?
                  <ToDo valueChanged={this.handleToDoValueChange} title={this.state.tasks[2].title} count={this.state.tasks[2].count} num={3} cancheck={this.state.cancheck}/> : null}
              </View> : null}
              {this.state.tasks && this.state.tasks[3] ? <View style={styles.card} >
                <Text style={styles.titletext}>Дополнительно</Text>
                <Text style={styles.textComm}>Не откладывайте в долгий ящик</Text>
                <ToDo valueChanged={this.handleToDoValueChange} title={this.state.tasks[3].title} count={this.state.tasks[3].count} num={4}  cancheck={this.state.cancheck}/>
                {this.state.tasks && this.state.tasks[4] ?
                  <ToDo valueChanged={this.handleToDoValueChange} title={this.state.tasks[4].title} count={this.state.tasks[4].count} num={5}  cancheck={this.state.cancheck}/> : null}
              </View> : null}
            </View>

          </View>
          <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: 48 }}>
            <Button
              style={styles.button}
              //disabled={!this.state.isFinished}
              onPress={() => {
                this.ckeckisfinished()
                //this.props.navigation.navigate('DayReview')
              }}
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
  }
};
export default ToDoTask

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