import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "../assets/icons/pluse.svg"
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

    <View style={{
      backgroundColor: '#3F93D9',
      height: 70, width: '100%', flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:20,
    }}>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
        onPress={onNavigateMenu}
        style={{marginTop:25,}}
        >
          </TouchableOpacity>

        <Text style={[styles.buttonText]}>
          {props.text}
        </Text>
      </View>
      {props.add? <TouchableOpacity
      onPress={
        
        onNavigateAddTask
      }
      style={{marginTop:5, justifyContent:'center', alignItems:'center'}}>
        <Icon fill="white"></Icon>
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
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: '#fff',
   marginLeft:22
  },
});