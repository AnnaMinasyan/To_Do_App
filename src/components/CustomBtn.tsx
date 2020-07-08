import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
  btnStyling: object;
  textStyling: object;
  btnText: string;
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0088cc',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.8,
    color: '#fff',
    textTransform: 'uppercase',
  },
});

const CustomBtn: React.FunctionComponent<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, props.btnStyling]}>
        <Text style={[styles.buttonText, props.textStyling]}>
          {props.btnText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomBtn;
