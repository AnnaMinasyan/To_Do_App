import React from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import Inbox from '../assets/icons/inbox_icon.svg'
import CalendarIcon from "../assets/icons/calendar_icon.svg";
import Week from "../assets/icons/calendar2_icon.svg";
import Mount from "../assets/icons/calendar3_icon.svg";
import All from "../assets/icons/all_icon.svg";
import Settings from "../assets/icons/settings_icon.svg";
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

interface Props {}


const MenuDrawerContent: React.FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
     <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
      <View style={styles.screen}>

        <View style={[styles.top, { height: 65, }]}>
          <View style={{flexDirection:'row'}}>
            <Inbox height={16} ></Inbox>
          <Text style={styles.text}>Входящие</Text>
          </View>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F56060', }]}
          >
            <Text>5</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: '#FFFFFF', marginVertical: 5 }}>
          <Text style={styles.title}>Фокус на цели</Text>
          <View style={[styles.top, { height: 35, }]}>
          <View style={{flexDirection:'row'}}>
            <CalendarIcon height={16} />
            <Text style={styles.text}>День</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#3F93D9', }]}
            >
              <Text>4</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.top, { height: 35, }]}>
          <View style={{flexDirection:'row'}}>
            <Week height={16} />
            <Text style={styles.text}>Неделя</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#3F93D9', }]}
            >
              <Text>2</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.top, { height: 35, }]}>
          <View style={{flexDirection:'row'}}>
            <Mount height={16} />
            <Text style={styles.text}>Месяц</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#3F93D9', }]}
            >
              <Text>5</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.top, { height: 35, }]}>
          <View style={{flexDirection:'row'}}>
            <All height={16} />
            <Text style={styles.text}>Цели</Text>
            </View>
          </View>

        </View>
        </View>
        <View style={{ backgroundColor: '#FFFFFF', marginTop: 5, height: 300 }}>
          <Text style={styles.title}>Настройки</Text>
          <View style={[styles.settings,]}>
            <Settings height={16}/>
            <Text style={styles.text}>Основные</Text>
          </View>
        </View>
     
    </ScrollView>
    </DrawerContentScrollView>
  );
};

export default MenuDrawerContent;
const styles = StyleSheet.create({
  settings:{
    backgroundColor: '#FFFFFF',
    height: 35,
    flexDirection: 'row',
 //   justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24
  },


  screen: {
    flexDirection: 'column',
    justifyContent: 'space-between',
backgroundColor:'#DCDDE4'
  },
  top: {
    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6A6E77',
    marginLeft:12
  },
  button: {
    height: 20,
    width: 20,
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center', shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3.84,

    elevation: 5,

  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#363940',
    marginVertical: 23,
    marginLeft: 23
  }

});
