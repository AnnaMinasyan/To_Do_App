import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CustomBtn from './CustomBtn';

interface Props {}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
  },
  button: {
    height: 30,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#445566',
  },
  leftButton: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  rightButton: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  buttonSelected: {
    backgroundColor: '#445566',
  },
  buttonNotSelected: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 12,
    textTransform: 'none',
  },
  buttonNotSelectedText: {
    color: '#445566',
  },
});

const TasksViewSwitcher: React.FunctionComponent<Props> = () => {
  const navigation = useNavigation();
  const [selected, makeSelected] = useState('TasksList');

  return (
    <View style={styles.btnContainer}>
      {/* <CustomBtn
        btnStyling={[
          styles.button,
          styles.leftButton,
          selected === 'TasksMap'
            ? styles.buttonSelected
            : styles.buttonNotSelected,
        ]}
        btnText="Карта"
        textStyling={[
          styles.buttonText,
          selected !== 'TasksMap' ? styles.buttonNotSelectedText : null,
        ]}
        onPress={() => {
          makeSelected('TasksMap');
          navigation.navigate('TasksMap');
        }}
      /> */}
      {/* <CustomBtn
        btnStyling={[
          styles.button,
          styles.rightButton,
          selected === 'TasksList'
            ? styles.buttonSelected
            : styles.buttonNotSelected,
        ]}
        btnText="Список"
        textStyling={[
          styles.buttonText,
          selected !== 'TasksList' ? styles.buttonNotSelectedText : null,
        ]}
        onPress={() => {
          makeSelected('TasksList');
          navigation.navigate('TasksList');
        }}
      /> */}
    </View>
  );
};

export default TasksViewSwitcher;
