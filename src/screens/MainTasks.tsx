import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Button } from 'native-base';
import { storeData, getData } from "../api/api"
import Header from "../components/Header"
import { NavigationScreenProp } from 'react-navigation';
import moment from "moment";
import Modal from 'react-native-modal';
import Close from "../assets/icons/close.svg"
import { createDndContext } from "react-native-easy-dnd";
import { Animated } from 'react-native';
import Icon from "../assets/icons/dots.svg"
const { Provider, Droppable, Draggable } = createDndContext();
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
  title: string,
  isDrag: boolean
}
interface IState {
  todaytasks: DataTypeItem[],
  isStart: boolean
  time: any,
  hideQuetionModal: boolean,
  activDragIndex: number,
  activDropIndex: number
}
interface LocalStorageSaveData {
  tasks: DataTypeItem[],
  review: string,
  mark: string,
  isfinished: boolean,
  isStart: boolean
}
class MainTasks extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      todaytasks: [],
      isStart: false,
      time: moment()
        .utcOffset('+05:30')
        .format('YYYY-MM-DD'),
      hideQuetionModal: false,
      activDragIndex: 5,
      activDropIndex: 5
    }
    const unsubscribe = props.navigation.addListener('focus', () => {
      this.setData()
    });
  }
  setData = async (): Promise<void> => {
    const data = await getData(this.state.time)
    const localStroageSavingData: LocalStorageSaveData = {
      mark: '',
      review: '',
      tasks: [],
      isfinished: false,
      isStart: false
    }
    if (data == null) {
      storeData(this.state.time, localStroageSavingData)
    } else {
      if (data.isfinished) {
        const tim = moment().add(1, 'days').utcOffset('+05:30')
          .format('YYYY-MM-DD')
        const tomm = await getData(tim)
        this.setState({ time: tim })
        if (tomm == null) {
          storeData(tim, localStroageSavingData)
        } else {
          if (tomm.tasks.length > 0) {
            tomm.isStart = true
            this.setState({ isStart: true })
            storeData(tim, tomm)
          }
          for (let index = 0; index < tomm.tasks.length; index++) {
            tomm.tasks[index].isDrag = true
          }
          this.setState({ todaytasks: tomm.tasks })
        }
      } else {
        if (data.tasks.length > 0) {
          this.setState({ isStart: true })
        }
        for (let index = 0; index < data.tasks.length; index++) {
          data.tasks[index].isDrag = true
        }
        this.setState({ todaytasks: data.tasks })
      }

    }
  };
  isStarted() {
    return <Modal
      onBackButtonPress={() => { this.setState({ hideQuetionModal: false }) }}
      isVisible={this.state.hideQuetionModal}>
      <View style={styles.modal}>
        <TouchableOpacity
          style={{ position: 'absolute', right: 10, top: 5, }}
          onPress={() => { this.setState({ hideQuetionModal: false }) }}  >
          <View ><Close height={20} width={20} fill='#3F93D9' /></View>
        </TouchableOpacity>
        <View >
          <Text style={{ fontSize: 20 }}>Bы уверены? </Text>
        </View>
        <View style={{ width: '60%', marginTop: 50, justifyContent: 'space-between', flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {  this.onNavigateToDoTask() }}  >
            <View style={styles.btnYes} >
              <Text style={{ fontSize: 16, color: 'white' }}>Да</Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this.setState({ hideQuetionModal: false }) }}  >
            <View style={styles.btnNo}><Text style={{ fontSize: 16, color: 'white' }}>Нет</Text></View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  }
  onNavigateMenu = (): void => {
    this.props.navigation.navigate('MenuDrawer')
  };
  onNavigateToDoTask = (): void => {
    if (this.state.todaytasks.length > 0) {
      getData(this.state.time).then((data) => {
        data.isStart = true
        this.setState({ isStart: true })
        storeData(this.state.time, data).then(() => {
          this.props.navigation.navigate('ToDoTask')
        })
      })
    }
  };
  changeTasksIndexes() {
  //  let element = this.state.todaytasks
    // if (this.state.activDropIndex < 5 && this.state.activDragIndex < 5) {R
    //   let temp = element[this.state.activDragIndex]
    //   element[this.state.activDragIndex] = element[this.state.activDropIndex]
    //   element[this.state.activDropIndex] = temp
    //   for (let index = 0; index < element.length; index++) {
    //     element[index].isDrag = true
    //   }
    //   this.setState({ todaytasks: element })
    // }
    if(this.state.activDragIndex<5 && this.state.activDropIndex<5){
    const temp=this.arrayMove(this.state.todaytasks,this.state.activDragIndex,this.state.activDropIndex)
    
      for (let index = 0; index < temp.length; index++) {
      temp[index].isDrag = true
        }
   
   
  this.setState({ todaytasks: temp })
}  else{
  let element = this.state.todaytasks
  for (let index = 0; index < element.length; index++) {
        element[index].isDrag = true
      }
  this.setState({activDragIndex:5,activDropIndex:5,todaytasks:element})
}
  }
  arrayMove(arr: any[], old_index: number, new_index: number) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
}
  changeDragIndex(dragIndex: number) {
    console.log(dragIndex);
    let arr = this.state.todaytasks
    for (let index = 0; index < arr.length; index++) {
      let element = arr[index]
      if (index != dragIndex) {
        element.isDrag = false
      } else {
        element.isDrag = true
      }
    }
    this.setState({ todaytasks: arr })
  }
  onNAvigateAddTask = (): void => {
    this.props.navigation.navigate('AddTask', { key: this.state.time })
  };
  render() {
    return (
      < Provider>
        <ScrollView style={{ backgroundColor: 'white', }}>
          <View style={styles.screen}>
            <Header text={this.state.time == moment()
              .utcOffset('+05:30')
              .format('YYYY-MM-DD') ? 'Сегодня ' : 'Завтра'} onPress={() => { this.onNavigateMenu() }} add={this.state.todaytasks.length < 5} onNavigate={() => { this.onNavigateMenu() }} />
            <View style={{ width: '100%' }}>
              <View style={{ backgroundColor: "#F2F3F8", paddingBottom: 5 }}>
                {this.state.todaytasks.map((data, index) => {
                  const {  value, title, isDrag } = data
                  return (
                    <View  >
                      {index == 0 ? <View style={[{ marginTop: 7,zIndex:1, }, styles.card]}>
                        <Text style={styles.titletext}>Основные задачи</Text>
                        <Text style={styles.textComm}>Ваши главные задачи на сегодня</Text>
                      </View> : null}
                      {index == 1 ? <View style={[styles.card, { marginTop: 7 ,zIndex:1,}]}>
                        <Text style={styles.titletext}>Второстепенные задач</Text>
                        <Text style={styles.textComm}>Выполнили все основые? Не забудьте про эти!</Text>
                      </View> : null}
                      {index == 3 ? <View style={[styles.card, { marginTop: 7 ,zIndex:1, }]}>
                        <Text style={styles.titletext}>Дополнительно</Text>
                        <Text style={styles.textComm}>Не откладывайте в долгий ящик</Text>
                      </View> : null}
                      {isDrag ? <Draggable
                        onDragStart={() => {
                          this.changeDragIndex(index)
                          this.setState({ activDragIndex: index })
                          console.log('Started draggging');
                        }}
                        onDragEnd={() => {
                          
                          this.changeTasksIndexes()
                          console.log('Ended draggging');
                        }}
                        payload="my-draggable-item"
                      >
                        {({ viewProps }) => {
                          return (
                            <Animated.View
                              {...viewProps}
                              style={[viewProps.style, { width: '100%', backgroundColor: "white", height: 43 ,zIndex:100000}]}
                            >
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                  style={{ width: "85%", }}
                                  onPress={() => { this.props.navigation.navigate('EditTask', { comment: value, title: title, index: index, day: this.state.time }) }}
                                >
                                  <View style={{
                                    flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',
                                    width: "100%",
                                    paddingBottom: 5,
                                    paddingHorizontal: 23,
                                    height: 43
                                  }}>
                                    <Text style={styles.textTask}>{index + 1}.{title} </Text>
                                  </View>
                                </TouchableOpacity>
                                <View style={{ width: '20%', paddingTop: 8, flexDirection: 'row' }}>
                                  <Icon height={30} width={30} fill={'grey'} style={{ width: 5 }} />
                                </View>
                              </View>
                            </Animated.View>
                          );
                        }}
                      </Draggable> :
                        <Droppable
                          onEnter={() => {
                            this.setState({ activDropIndex: index })
                            console.log('Draggable entered');
                          }}
                          onLeave={() => {
                            console.log('Draggable left');
                          }}
                          onDrop={({ payload }) => {
                            console.log('Draggable with the following payload was dropped', payload);
                          }}
                        >
                          {({ active, viewProps }) => {
                            return (
                              <Animated.View
                                {...viewProps}
                                style={[
                                  {
                                    width: '100%',
                                     zIndex:10000, 
                                    backgroundColor:this.state.activDropIndex==index? '#e6e6e6':"white",
                                   
                                  },
                                  viewProps.style,
                                ]}
                              >
                                <View>
                                  <TouchableOpacity
                                    style={{ width: "50%", height: 43,backgroundColor:this.state.activDropIndex==index? '#e6e6e6':"white"}}
                                    onPress={() => { this.props.navigation.navigate('EditTask', { comment: value, title: title, index: index, day: this.state.time }) }}
                                  >
                                    <View style={{
                                      flexDirection: 'row', alignItems: 'center', backgroundColor: this.state.activDropIndex==index? '#e6e6e6':"white",
                                      width: "100%",
                                      paddingBottom: 5,
                                      paddingHorizontal: 23

                                    }}>
                                      <Text style={styles.textTask}>{index + 1}.{title} </Text>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </Animated.View>
                            );
                          }}
                        </Droppable>
                      }
                    </View>
                  )
                })}
              </View>
              {this.state.hideQuetionModal ? this.isStarted() : null}

            </View>
            <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', marginTop: 48 }}>
              {this.state.todaytasks.length
                ? <Button

                  style={styles.button}
                  onPress={() => { this.setState({ hideQuetionModal: true }) }}>
                  <Text style={styles.buttonText}>Начать</Text>
                </Button> : <Text style={[styles.titletext,{ fontWeight: "600",}]}>Список пуст</Text>}

            </View>
          </View>
        </ScrollView>
      </Provider>
    );
  }
}

export default MainTasks
const styles = StyleSheet.create({
  btnYes: { width: 50, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 5 },
  btnNo: { width: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 5 },
  titletext: {
    fontSize: 17,
    fontWeight: "bold",
    color: '#363940',
   // fontFamily:'SF Pro Display'
  },
  checkbox: {
    alignSelf: "center",
    borderRadius: 20
  },
  card: {
    backgroundColor: 'white',
    width: "100%",
    paddingTop: 17,

    //paddingBottom: 30,
    //borderTopWidth: 1,
    borderColor: '#e6e6e6',
    // marginBottom: 5,
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
  modal: {
    backgroundColor: '#F2F3F8',
    width: '100%',
    height: 200,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
});