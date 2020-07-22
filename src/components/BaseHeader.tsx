import React from 'react';
import {View, TouchableOpacity, StyleSheet,
  Text} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import MenuSvg from '../assets/icons/menu_icon.svg';
import Filter from '../assets/icons/filter-icon.svg';
import global_styles from "../assets/styles/global_styles"
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions" 
interface Props {
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    height: 56,
   
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0088cc',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: '#fff',
   marginLeft:12.70
  },
});

const BaseHeader: React.FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();

  return (
  
    <View style={styles.headerContainer}
   
    >
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{width:calcWidth(70),justifyContent:'center',marginTop:calcHeight(10)}}
        >
        
          <MenuSvg height={calcHeight(12)} width={calcWidth(17.28)}/>
          </TouchableOpacity>

       
      </View>
     
    </View>
  );
};

export default BaseHeader;
