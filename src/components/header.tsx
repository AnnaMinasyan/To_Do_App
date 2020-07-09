import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//import MenuSvg from "../assets/icons/menu_icon.svg"
interface Props {
  onPress: () => void;
  onHavigate :()=>void;
add:Boolean
  text: string
}



const Header: React.FunctionComponent<Props> = (props) => {
  return (

    <View style={{
      backgroundColor: '#3F93D9',
      height: 70, width: '100%', flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:20,
    }}>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
        onPress={props.onPress}
        style={{marginTop:25,}}
        >
          </TouchableOpacity>

        <Text style={[styles.buttonText]}>
          {props.text}
        </Text>
      </View>
      {props.add? <TouchableOpacity
      onPress={props.onHavigate}
      style={{marginTop:5}}><Text style={[styles.buttonText, {  fontSize: 40 }]} >+</Text></TouchableOpacity>:null}
     
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
    textTransform: 'uppercase',
   marginLeft:22
  },
});