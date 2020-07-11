import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView} from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import moment from "moment";
import { storeData, getData } from "../api/api"

import Logo from '../assets/icons/logo.svg';
import Header from "../components/Header"
import { NavigationScreenProp } from 'react-navigation';
import Smile1 from "../assets/icons/bed_smile.svg"
import Smile2 from "../assets/icons/normal_smile.svg"
import Smile3 from "../assets/icons/happy_smile.svg"
interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  mark: string,
  comment: string
}

class DayReview extends React.Component<Props, IState> {
  constructor(props: Props) {
      super(props)
      this.state = {
          mark: '',
          comment: ''
      }

  }
//export const DayReview = (): React.ReactElement => {

tinishedTask(){
  const time = moment()
  .utcOffset('+05:30')
  .format('YYYY-MM-DD')
getData(time).then((data) => {
  
    data.isfinished = true
   
    data.review=this.state.comment
   storeData(time, data).then(()=>{
     this.props.navigation.navigate('MainTasks')
   })
  
})
}
  
 // const navigation = useNavigation();

   onNavigateMenu = (): void => {
     this.props.navigation.navigate('MenuDrawer')
  };
  render(){
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={styles.screen}>
        <Header text='Обзор дня ' onPress={() => { this.onNavigateMenu() }} add={false}  onNavigate={()=>{}} />
        <View style={{ width: '100%' }}>
        <View style={[styles.card, { marginTop: 7 }]} >
              <Text style={styles.titletext}>Заметки</Text>
              <Text style={styles.textComm}>К заполнению не обязательно</Text>
            </View>
        
        </View>
        <View style={{  width: '100%', alignItems: 'center',  }}>
        <TextInput
					style={[styles.input, {  }]}
					multiline={true}
					numberOfLines={5}
				//	value={comment}
      onChangeText={(r) => { this.setState({ comment: r }) }}
        placeholderTextColor={'#ADB1B5'}
					placeholder={'Здесь вы можете оставить заметку'}
				/>
         
        </View>
        <View style={[styles.card, { marginTop: 7 ,}]} >
              <Text style={[styles.titletext,]}>Оценить продуктивность</Text>
              <View style={styles.viewMark}>
                <View style={{alignItems:'center'}}>
                  <Smile1 height={27} width={31}/>
                  <Text style={styles.textComm}>Не доволен</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Smile2 height={27} width={31}/>
                  <Text style={styles.textComm}>Не доволен</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Smile3 height={27} width={31}/>
                  <Text style={styles.textComm}>Не доволен</Text>
                </View>
              </View>
            </View>
        
          <Button
          onPress={()=>{
            this.tinishedTask()
          }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Закончить</Text>
          </Button>
       
        
      </View>
    </ScrollView>
  );}
};
export default DayReview;

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
    
    // borderColor: '#e6e6e6',
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
    alignItems: 'center',

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
  input: {
    paddingHorizontal: 17,
   
    backgroundColor:'#F7F8F9',
    alignItems: 'baseline',
     justifyContent: 'flex-start',
      width:'90%',
      height:130,
      borderWidth:1,
      borderRadius:2,
      borderColor:'rgba(0, 0, 0, 0.04)'

  },
  viewMark:{flexDirection:'row', justifyContent:'space-between',  marginTop:24}
});