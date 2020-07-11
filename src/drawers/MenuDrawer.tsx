import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { storeData, getData } from "../api/api"
import moment from "moment";

import MenuDrawerContent from './MenuDrawerContent';
import ScreensNavigator from '../screens/ScreensNavigator';
import HomeNavigator from "../screens/HomeNavigator"
interface Props {}

const styles = StyleSheet.create({
  container: {
    width: '89%',
  },
});

const Drawer = createDrawerNavigator();

const MenuDrawer: React.FunctionComponent<Props> = () => {
  const [isstarting, changeIsloaning]=useState(false)
  const time = moment()
  .utcOffset('+05:30')
  .format('YYYY-MM-DD');
  
  getData(time).then(res=>{
		console.log("::::::::::::::::::::",res.isStart ,!res.isfinished );
		if(res &&  res.isStart ){
      console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
      if(res.isfinished){
        console.log("777777777777777777777777");
        changeIsloaning(false)
      }else{
        changeIsloaning(true)
      }
      
		}	
				//setLoginIn(!!res);
	})
  return (
    <Drawer.Navigator
      drawerStyle={styles.container}
      drawerPosition="left"
      edgeWidth={0}
      // @ts-ignore
      drawerContent={(props) => <MenuDrawerContent {...props} />}>
      {!isstarting?<Drawer.Screen name="ScreensNavigator" component={ScreensNavigator} />:
      <Drawer.Screen name="HomeNavigator" component={HomeNavigator} />}
    </Drawer.Navigator>
  );
};

export default MenuDrawer;
