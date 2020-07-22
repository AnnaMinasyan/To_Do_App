import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Inbox from '../assets/icons/inbox_icon.svg'
import CalendarIcon from "../assets/icons/calendar_icon.svg";
import Week from "../assets/icons/calendar2_icon.svg";
import Mount from "../assets/icons/calendar3_icon.svg";
import All from "../assets/icons/all_icon.svg";
import Settings from "../assets/icons/settings_icon.svg";
import { DrawerContentScrollView } from '@react-navigation/drawer';
import global_styles from "../assets/styles/global_styles"
import { calcFontSize, calcHeight, calcWidth } from "../assets/styles/dimensions"
interface Props { }


const MenuDrawerContent: React.FunctionComponent<Props> = (props) => {

  return (
    <DrawerContentScrollView {...props}>
      <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
        <View style={styles.screen}>

          <View style={[styles.top, styles.shodow,{ height: calcHeight(65),}]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Inbox height={calcHeight(16)} width={calcWidth(16)} ></Inbox>
              <Text style={styles.text}>Входящие</Text>
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#F56060', alignItems:'center' }]}
            >
              <Text style={{ color: 'white', fontSize: calcFontSize(11) }} >5</Text>
            </TouchableOpacity>
          </View>
          
          <View style={[{ backgroundColor: '#FFFFFF', marginVertical: calcHeight(1) },styles.shodow]}>
            <Text style={styles.title}>Фокус на цели</Text>
         
            <View style={[styles.top, { height: calcHeight(16), marginBottom:calcHeight(24.22)}]}>
              <View style={{ flexDirection: 'row' }}>
                <CalendarIcon height={calcHeight(16)} width={calcWidth(17.78)} />
                <Text style={styles.text}>День</Text>
              </View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#3F93D9',  }]}
              >
                <Text style={{ color: 'white',fontSize: calcFontSize(11) }}>4</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.top, { height: calcHeight(16), marginBottom:calcHeight(24.22) }]}>
              <View style={{ flexDirection: 'row' }}>
                <Week height={calcHeight(16)} width={calcWidth(17.78)} />
                <Text style={styles.text}>Неделя</Text>
              </View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#3F93D9', padding: 5 }]}
              >
                <Text style={{ color: 'white', fontSize: calcFontSize(11) }}>2</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.top, {height: calcHeight(16), marginBottom:calcHeight(24.22) }]}>
              <View style={{ flexDirection: 'row' }}>
                <Mount height={calcHeight(16)} width={calcWidth(17.78)} />
                <Text style={styles.text}>Месяц</Text>
              </View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#3F93D9', padding: 5 }]}
              >
                <Text style={{ color: 'white',fontSize: calcFontSize(11) }}>5</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.top, { height: calcHeight(16), marginBottom:calcHeight(31)}]}>
              <View style={{ flexDirection: 'row' }}>
                <All height={calcHeight(18)} width={calcWidth(18)} />
                <Text style={styles.text}>Цели</Text>
              </View>
            </View>

          </View>
        </View>
        <View style={{ backgroundColor: '#FFFFFF', marginTop: calcHeight(1), }}>
          <Text style={styles.title}>Настройки</Text>
          <View style={[styles.settings,]}>
            <Settings height={calcHeight(14.59)} width={calcWidth(15)} />
            <Text style={styles.text}>Основные</Text>
          </View>
        </View>

      </ScrollView>
    </DrawerContentScrollView>
  );
};

export default MenuDrawerContent;
const styles = StyleSheet.create({
  settings: {
    backgroundColor: '#FFFFFF',
    height: calcHeight(15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcWidth(25),
    marginTop:calcHeight(5)
  },

shodow:{
  shadowColor: "#DCDDE4",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.8,
  shadowRadius: 1.4,

  elevation: 3, 
  marginBottom:calcHeight(1)
},
  screen: {
    flexDirection: 'column',
    
    backgroundColor: '#DCDDE4'
  },
  top: {
    backgroundColor: '#FFFFFF',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: calcWidth(24),
    paddingRight: calcWidth(19)
  },
  text: {
    fontSize: calcFontSize(14),
    fontWeight: '500',
    color: '#6A6E77',
    marginLeft: calcWidth(12)
  },
  button: {
    height: calcHeight(25),
    width: calcWidth(20),
    borderRadius: calcWidth(20),

    justifyContent: 'center',
    alignItems: 'center', 
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 3.84,

    // elevation: 5,

  },
  title: {
    fontSize: calcFontSize(16),
    fontWeight: 'bold',
    color: '#363940',
    marginVertical: calcHeight(23),
    marginLeft: calcWidth(23)
  }

});
