import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView,TouchableOpacity} from 'react-native';
import { Button, Thumbnail } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { storeData, getData } from "../api/api"
import Modal from 'react-native-modal';

import Logo from '../assets/icons/logo.svg';
import Header from "../components/Header"
import { NavigationScreenProp } from 'react-navigation';
//import CustomTask from "../components/costumtasks"
import moment from "moment";
import Close from "../assets/icons/close.svg"

import  ToDo  from "../components/ToDoList"
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
  time:string,
  isModalVisible:number,
  hideQuetionModal:boolean
}
class ToDoTask extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      tasks: [],
      isFinished: true,
      cancheck:true,
      time:moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD'),
      isModalVisible:6,
      hideQuetionModal:false
    }
    const unsubscribe = props.navigation.addListener('focus', () => {
      this.setData()
    });
  }

  handleToDoValueChange(res: DataTypeItem): void {
    const time = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD')
    getData(time).then((data) => {
      if (data != null) {
        let finish = true
        for (let index = 0; index < data.tasks.length; index++) {
          const element = data.tasks[index];
          if (element.title == res.value) {
            element.count = !res.count
            break
          }
        }
        storeData(time, data)
      }
    })
  }
  ckeckisfinished() {
    return <Modal
        onBackButtonPress={() => { this.setState({hideQuetionModal:false}) }}
        isVisible={this.state.hideQuetionModal}>
        <View style={styles.modal}>
            <TouchableOpacity
                style={{ position: 'absolute', right: 10, top: 5, }}
                onPress={() => { this.setState({hideQuetionModal:false})}}  >
                <View ><Close height={25} width={25} fill='#3F93D9' /></View>
            </TouchableOpacity>
            <View >
                <Text style={{fontSize:20}}>Bы уверены?</Text>
            </View>
            <View style={{ width: '60%', marginTop: 50, justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity
             onPress={() => { this.setState({hideQuetionModal:false}),this.props.navigation.navigate('DayReview') }}  >
            <View style={styles.btnYes} >
              <Text style={{ fontSize: 16,color:'white'}}>Да</Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this.setState({ hideQuetionModal: false }) }}  >
            <View style={styles.btnNo}><Text style={{ fontSize: 16, color:'white'}}>Нет</Text></View>
          </TouchableOpacity>
        </View>
        </View>
    </Modal>
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
          time:tim,
          isFinished:false
        })
      }else{
        this.setState({
          tasks: data.tasks,
        })
      }
    }
  };
   

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white', }}>
        <View style={styles.screen}>
          <Header text={this.state.time == moment()
            .utcOffset('+05:30')
            .format('YYYY-MM-DD') ? 'Сегодня ' : 'Завтра'} onPress={() => { }} add={false} onNavigate={() => { }} />
          <View style={{ width: '100%' }}>
            <View style={{ backgroundColor: "#F2F3F8", }}>
              {this.state.tasks && this.state.tasks[0] ? <View style={[styles.card, { marginTop: 7 }]}  >
                <Text style={styles.titletext}>Основные задачи</Text>
                <Text style={styles.textComm}>Ваши главные задачи на сегодня</Text>
                <ToDo valueChanged={this.handleToDoValueChange} 
                 data={{
                   title:this.state.tasks[0].title,
                   value:this.state.tasks[0].value,
                  count:this.state.tasks[0].count,
                  cancheck:this.state.cancheck,
                  num:1
                  }} />

              </View> : null}
              {this.state.tasks && this.state.tasks[1] ? <View style={styles.card} >
                <Text style={styles.titletext}>Второстепенные задач</Text>
                <Text style={styles.textComm}>Выполнили все основые? Не забудьте про эти!</Text>
                <ToDo valueChanged={this.handleToDoValueChange} data={{
                   title:this.state.tasks[1].title,
                   value:this.state.tasks[1].value,
                  count:this.state.tasks[1].count,
                  cancheck:this.state.cancheck,
                  num:2
                  }} />
                {this.state.tasks && this.state.tasks[2] ?
                  <ToDo valueChanged={this.handleToDoValueChange} data={{
                    title:this.state.tasks[2].title,
                    value:this.state.tasks[2].value,
                   count:this.state.tasks[2].count,
                   cancheck:this.state.cancheck,
                   num:3
                   }}/> : null}
              </View> : null}
              {this.state.tasks && this.state.tasks[3] ? <View style={styles.card} >
                <Text style={styles.titletext}>Дополнительно</Text>
                <Text style={styles.textComm}>Не откладывайте в долгий ящик</Text>
                <ToDo valueChanged={this.handleToDoValueChange} data={{
                   title:this.state.tasks[3].title,
                   value:this.state.tasks[3].value,
                  count:this.state.tasks[3].count,
                  cancheck:this.state.cancheck,
                  num:4
                  }} />
                {this.state.tasks && this.state.tasks[4] ?
                  <ToDo valueChanged={this.handleToDoValueChange} data={{
                    title:this.state.tasks[4].title,
                    value:this.state.tasks[4].value,
                   count:this.state.tasks[4].count,
                   cancheck:this.state.cancheck,
                   num:5
                   }}/> : null}
              </View> : null}
            </View>
            {this.state.isModalVisible ? this.ckeckisfinished() : null}
          </View>
          <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: 48 }}>
            <Button
              style={styles.button}
              disabled={!this.state.isFinished}
              onPress={() => {
                this.setState({hideQuetionModal:true})
              }}
            >
              <Text style={styles.buttonText}>Закончить</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
};
export default ToDoTask

const styles = StyleSheet.create({
  btnYes:{width:50, backgroundColor:'green', justifyContent:'center', alignItems:'center',padding:5, borderRadius:5},
  btnNo:{width:50,  backgroundColor:'red',justifyContent:'center', alignItems:'center',padding:5, borderRadius:5},
  titletext: {
    fontSize: 17,
    fontWeight: "bold",
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
  },
  modal:{
    backgroundColor: '#F2F3F8',
    width: '100%',
    height: 200,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent:'center',
    alignItems:'center'
},
});