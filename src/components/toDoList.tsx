import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    
count:number,
    title: string,
    ischecked: boolean,
    valueChanged:any
}
interface DataTypeItem {
    count: boolean,
    value: string,
  }

export const  ToDo  = (props:Props): React.ReactElement => {
    const [status, changeStatus] = useState(props.ischecked)

   
     function change(value:DataTypeItem){
        changeStatus(!status)
        props.valueChanged(value);
    }

        return (

            <View style={{ flexDirection: 'row', marginTop: 10, alignItems:'center' }}>
                <TouchableOpacity
                onPress={() => {
                   change({value:props.title,count:!props.ischecked})
               
                }} 
                >
                    {!status ?
                        <View style={styles.unchecked}>
                          
                            </View> :
                        <View style={styles.checked}>
                            <Text>+</Text></View>}
                </TouchableOpacity>
    
                <Text style={styles.textTask}>{props.count}. {props.title}</Text>
            </View>
    
        );
    
}



const styles = StyleSheet.create({
    textTask: {
        fontSize: 14,
    },
    unchecked:{
        height:22,
         width:22,
         borderWidth:1,
         borderColor:'#62646D',
         borderRadius:20,
         marginRight:14,
         
        },
        checked:{
            height:22,
            width:22,
            borderWidth:1,
            borderColor:'#3F93D9',
            borderRadius:20,
            marginRight:14,
            backgroundColor:'#3F93D9',
            justifyContent:'center',
            alignItems:'center',shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            
            elevation: 2,
        }
});