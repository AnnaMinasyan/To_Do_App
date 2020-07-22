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
import global_styles from "../assets/styles/global_styles"
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions" 
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
    onBackdropPress={() => { this.setState({ hideQuetionModal: false }) }}
      isVisible={this.state.hideQuetionModal}>
      <View style={global_styles.modal}>
        <TouchableOpacity
          style={{ position: 'absolute', right: calcWidth(0), top: calcHeight(0),
           height:calcHeight(40),width:calcWidth(40), paddingTop:calcHeight(14),paddingLeft:calcWidth(20)}}
          onPress={() => { this.setState({ hideQuetionModal: false }) }}  >
          <View ><Close height={calcHeight(14)} width={calcWidth(14)} fill='#8990A1' /></View>
        </TouchableOpacity>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={global_styles.h1}>Bы уверены? </Text>
          <Text style={global_styles.textComm}>Сохранить изменения</Text>
        </View>
        <View style={{ width:'100%', marginTop: calcHeight(25), justifyContent: 'space-between', flexDirection: 'row',paddingHorizontal:calcWidth(65)}}>
        <TouchableOpacity
            onPress={() => { this.setState({ hideQuetionModal: false }) }}  >
            <View style={global_styles.btnNo}><Text style={{ fontSize: calcFontSize(14), color: 'white' }}>Нет</Text></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {  this.onNavigateToDoTask() }}  >
            <View style={global_styles.btnYes} >
              <Text style={{ fontSize: calcFontSize(14), color: 'white' }}>Да</Text></View>
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
  storeData(this.state.time, temp)
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
        <ScrollView style={{ backgroundColor: '#F7F7F8',}}>
          {/* <View style={[styles.screen,{zIndex:1 }]}> */}
            <Header text={this.state.time == moment()
              .utcOffset('+05:30')
              .format('YYYY-MM-DD') ? 'Сегодня ' : 'Завтра'} onPress={() => { this.onNavigateMenu() }} add={this.state.todaytasks.length < 5} onNavigate={() => { this.onNavigateMenu() }} />
            <View style={{ width: '100%' }}>
              <View style={{ backgroundColor: "#F7F7F8",}}>
                {this.state.todaytasks.map((data, index) => {
                  const {  value, title, isDrag } = data
                  return (
                    <View style={{
                      
                    paddingBottom:index==0 ||index==2 ||index==4?calcHeight(20):calcHeight(0),
                    //marginBottom:this.state.todaytasks.length>index && index==0 ||index==2 ?calcHeight(6):calcHeight(0),
                   marginTop:calcHeight(6),
                    }} >
                       {index == 0 ? <View style={[{zIndex:1,height:calcHeight(79),paddingLeft:calcWidth(23), paddingTop:calcHeight(16),backgroundColor:'#FFFFFF',}]}>
                        <Text style={global_styles.h1}>Основные задачи</Text>
                        <Text style={global_styles.textComm}>Ваши главные задачи на сегодня</Text>
                      </View> : null}

                      {index == 1 ? <View style={{
                        zIndex:1,height:calcHeight(79),paddingLeft:calcWidth(23), paddingTop:calcHeight(16),backgroundColor:'#F7F7F8'
                      }}>
                        <Text style={global_styles.h1}>Второстепенные задач</Text>
                        <Text style={global_styles.textComm}>Выполнили все основые? Не забудьте про эти!</Text>
                      </View> : null}
                      {index == 3 ? <View style={{zIndex:1,height:calcHeight(79),paddingLeft:calcWidth(23), paddingTop:calcHeight(16),backgroundColor:'#F7F7F8'}}>
                        <Text style={global_styles.h1}>Дополнительно</Text>
                        <Text style={global_styles.textComm}>Не откладывайте в долгий ящик</Text>
                      </View> : null}
                     {isDrag ? 
                     <View
                     style={{
                     backgroundColor:'#F7F7F8',
                      shadowColor: "#EAEAF2",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.29,
                      shadowRadius: 3.65,
                      
                      elevation: 5,
                      height: calcHeight(43) ,
                     }}
                     ><Draggable
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
                              style={[viewProps.style, { width: '100%',
                               backgroundColor: "white",
                             
                                zIndex:9999,}]}
                            >
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                  style={{ width: "80%", }}
                                  onPress={() => { this.props.navigation.navigate('EditTask', { comment: value, title: title, index: index, day: this.state.time }) }}
                                >
                                  <View style={styles.items}>
                                    <Text style={styles.textTask} ellipsizeMode='tail' numberOfLines={1}>{index + 1}.{title} </Text>
                                  </View>
                                </TouchableOpacity>
                                <View style={styles.dndIcon}>
                                  <Icon height={calcHeight(18)} width={calcWidth(6)} fill={'#D2D2DC'}  />
                                </View>
                              </View>
                            </Animated.View>
                          );
                        }}
                      </Draggable></View> :
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
                                   
                                     zIndex:10000, 
                                    backgroundColor:this.state.activDropIndex==index? '#e6e6e6':"white",
                                   
                                  },
                                  viewProps.style,
                                ]}
                              >
                                <View>
                                  <TouchableOpacity
                                    style={{ width: "80%", height: calcHeight(43),backgroundColor:this.state.activDropIndex==index? '#e6e6e6':"white"}}
                                    onPress={() => { this.props.navigation.navigate('EditTask', { comment: value, title: title, index: index, day: this.state.time }) }}
                                  >
                                    <View style={{
                                      flexDirection: 'row', alignItems: 'center', backgroundColor: this.state.activDropIndex==index? '#e6e6e6':"white",
                                      width: "100%",
                                   //   paddingBottom: 5,
                                      paddingHorizontal: calcHeight(23)

                                    }}>
                                      <Text style={styles.textTask} ellipsizeMode='tail' numberOfLines={1}>{index + 1}.{title} </Text>
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </Animated.View>
                            );
                          }}
                        </Droppable>
                      }
                      {/* {index==1 || index==3?<View style={global_styles.hr}/>:null} */}
                    </View>
                  )
                })} 
              </View>
              {this.state.hideQuetionModal ? this.isStarted() : null}

            </View>
            <View style={[global_styles.viewBtn,{zIndex:1}]}>
              {this.state.todaytasks.length
                ? <Button

                  style={[global_styles.button,{zIndex:1}]}
                  onPress={() => { this.setState({ hideQuetionModal: true }) }}>
                  <Text style={global_styles.buttonText}>Начать</Text>
                </Button> : <Text style={[styles.titletext,{ fontWeight: "600",}]}>Список пуст</Text>}

            </View>
        
        </ScrollView>
      </Provider>
    );
  }
}

export default MainTasks
const styles = StyleSheet.create({
 
  titletext: {
    fontSize: calcFontSize(17),
    fontWeight: "bold",
    color: '#363940',
   // fontFamily:'SF Pro Display'
  },
  checkbox: {
    alignSelf: "center",
    borderRadius: 20
  },
  dndIcon:{ width: '20%',  
  flexDirection: 'row',
  alignItems:'center', 
  justifyContent:'center',
  marginLeft:calcWidth(15) },
 items:{
  flexDirection: 'row',
   alignItems: 'center', 
   backgroundColor: 'white',
  width: "100%",

  paddingHorizontal: 23,
  height: calcHeight(43),
  
},
  textTask: {
    marginTop: calcFontSize(5),
    fontSize: calcFontSize(14),
    width:calcWidth(300),
   
  },
  screen: {
    //alignItems: 'center',

    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  
 

});