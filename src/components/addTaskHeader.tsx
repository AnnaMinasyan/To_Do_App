import React from 'react';
import {View, TouchableOpacity, StyleSheet,
  Text} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import MenuSvg from '../assets/icons/menu_icon.svg';
import Filter from '../assets/icons/filter-icon.svg';

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
    textTransform: 'uppercase',
   marginLeft:12.70
  },
});

const AddTaskHeader: React.FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();

  return (
    // <View style={styles.headerContainer}>
    //   <TouchableOpacity
    //     onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
    //     <Hamburger width={24} height={15} />
    //   </TouchableOpacity>
    //   {props.title}
    //   <TouchableOpacity
    //     onPress={() =>
    //       navigation
    //         .dangerouslyGetParent()
    //         ?.dangerouslyGetParent()
    //         ?.dispatch(DrawerActions.toggleDrawer())
    //     }>
    //     <Filter width={22} height={24} />
    //   </TouchableOpacity>
    // </View>
    
    <View style={styles.headerContainer}
    // style={{
    //   backgroundColor: '#3F93D9',
    //   height: 70, width: '100%', flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:20,
    //   position:'relative'
    // }}
    >
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{marginTop:17,backgroundColor:'blue'}}
        >
         
          
          </TouchableOpacity>

       
      </View>
     
    </View>
  );
};

export default AddTaskHeader;
