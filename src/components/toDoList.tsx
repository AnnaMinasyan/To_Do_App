import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Check from "../assets/icons/checked-radio.svg"
import {storeData,getData} from "../api/api"

interface Props {
    
num:number,
    title: string,
    count: boolean,
    valueChanged:any
}
interface DataTypeItem {
    count: boolean,
    value: string,
  }

export const  ToDo  = (props:Props): React.ReactElement => {
    const [status, changeStatus] = useState(props.count)

   
     function change(res:DataTypeItem){
        changeStatus(!status)
        getData('tasks').then((data)=>{
            if(data!=null){
                const array=data
              for (let index = 0; index < array.length; index++) {
                  const element = array[index];
                  console.log("111",element.value,res.value,res.count );
                  
                  if (element.value == res.value ) {
                          console.log('element.value');
                          
                          element.count = !res.count
                          break
                        }
              }
                  console.log("[[[[[[[[",array);
                  storeData('tasks',array )
                  props.valueChanged(array);
                  }
              console.log("rees",res);
              
        })
        
      
        //setData(res)
     
    }
//    const setData = async (res:any): Promise<void> => {
//         const data= await getData('tasks')
        
//         if(data!=null){
//           const array=data
//         for (let index = 0; index < array.length; index++) {
//             const element = array[index];
//             console.log("111",element.value,res.value,res.count );
            
//             if (element.value == res.value ) {
//                     console.log('element.value');
                    
//                     element.count = res.count
//                     break
//                   }
//         }
//             console.log("[[[[[[[[",array);
//             storeData('tasks',array )
//             }
        
       
//       };
    // function handleToDoValueChange(data: DataTypeItem): void {
    //     console.log("+++++++++++++++++++++++++++++++++++++");
       
      //  const array = this.state.tasks
        // for (let index = 0; index < array.length; index++) {
        //   const element = array[index];
        //   console.log("{{{{{{",data.value,element.value);
          
        //   if (element.value == data.value ) {
        //     console.log('element.value',element.value,data.count);
            
        //     element.count = data.count
        //     break
        //   }
        // }
       //  console.log("___________________",array[0].count);
       //  changeTasks(array)
        // console.log("useEffecttttttttttttttttttt",array);
        
       //  storeData('tasks',array )
   //   } 
        return (

            <View style={{ flexDirection: 'row', marginTop: 10, alignItems:'center' }}>
                <TouchableOpacity
                onPress={() => {
                    console.log(props.count);
                
                  change({value:props.title,count:status})
               
                }} 
                >
                    {!status ?
                        <View style={styles.unchecked}>
                          
                            </View> :
                        <View style={styles.checked}>
                            <Check height={10}/></View>}
                </TouchableOpacity>
    
                <Text style={styles.textTask}>{props.num}. {props.title}</Text>
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