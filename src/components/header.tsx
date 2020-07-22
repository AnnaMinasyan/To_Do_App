import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "../assets/icons/pluse.svg"
import global_styles from "../assets/styles/global_styles"
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions" 
//import MenuSvg from "../assets/icons/menu_icon.svg"
interface Props {
  onPress: () => void;
  onNavigate :()=>void;
add:Boolean
  text: string
}



const Header: React.FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();

  const onNavigateMenu = (): void => {
    navigation && navigation.navigate('MenuDrawer')
  };
  const  onNavigateAddTask = (): void => {
      navigation && navigation.navigate('AddTask')
   };
  return (

    <View style={styles.header}>

      <View style={{flexDirection:'row', }}>
       

        <Text style={[styles.buttonText]}>
          {props.text}
        </Text>
      </View>
      {props.add? <TouchableOpacity
      onPress={
        
        onNavigateAddTask
      }
      style={{marginTop:calcHeight(5), justifyContent:'center', alignItems:'center',height:calcHeight(60),width:calcWidth(50), }}>
        <Icon fill="white" height={calcHeight(16)} width={calcWidth(16)}></Icon>
      </TouchableOpacity>:null}
     
    </View>

  );
};

export default Header;
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0088cc',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: calcFontSize(18),
    fontWeight: '600',
    letterSpacing: 0.8,
    color: '#fff',
   marginLeft:calcWidth(20)
  },
  header:{
    backgroundColor: '#3F93D9',
    height: calcHeight(61),
     width: '100%', 
     flexDirection: 'row',
      justifyContent:'space-between',
      paddingLeft:calcWidth(22),
       alignItems:'center',
       
  }
});