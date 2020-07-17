import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Check from "../assets/icons/checked-radio.svg"
import {storeData,getData} from "../api/api"
import Modal from 'react-native-modal';
import Close from "../assets/icons/close.svg"
interface Props {
    data:IData

    valueChanged:any,
   
}
interface IData{
    title:string,
    value:string,
   count:boolean,
   cancheck:boolean,
   num:number
}
interface DataTypeItem {
    count: boolean,
    value: string,
  }
  interface IState {
   status:boolean,
   isModalVisible:number
  }
  //export const ToDoTask = (): React.ReactElement => {
  class ToDo extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            isModalVisible:6,
            status:false
        }
        
      }
   
   change(res:DataTypeItem){
      this.setState({status:!this.state.status})
            this.props.valueChanged(res);
    }
    toggleModal(value:number) {
     
        this.setState({isModalVisible:value});
      }
     
    openInfoModal(){
       
        return <Modal
        onBackButtonPress={()=>{this.toggleModal(6)}}
         isVisible={this.state.isModalVisible>5?false:true}>
             <View style={{ 
               backgroundColor:'#F2F3F8',
             width:'100%',
             height:600,
            paddingHorizontal:20,
            borderRadius:5
             }}>
           <TouchableOpacity  
           style={{position:'absolute',right:5,top:5, }}
           onPress={()=>{this.toggleModal(6)}}  >
               <View style={styles.closed}><Close height={25} width={25} fill='#cccccc'/></View>
               </TouchableOpacity>
    
           <View style={{marginTop:30}}>
           <Text style={styles.titletext}>{this.props.data.title}</Text>
          
           </View>
    <View style={{marginTop:10, justifyContent:'center', alignItems:"center"}}>
    <Text style={styles.textComm}>{this.props.data.value}</Text> 
    </View>
      
      </View>
        </Modal>
      }
      render(){

    
        return (

            <View style={{ flexDirection: 'row', marginTop: 10, alignItems:'center' }}>
                
                <TouchableOpacity
                disabled={!this.props.data.cancheck}
                onPress={() => {
                    console.log(this.props.data.count);
                
                  this.change({value:this.props.data.title,count:this.state.status})
               
                }} 
                >
                    {!this.state.status ?
                        <View style={styles.unchecked}>
                          
                            </View> :
                        <View style={styles.checked}>
                            <Check height={10}/></View>}
                </TouchableOpacity>
                <TouchableOpacity
                style={{width:'100%', height:20}}
                onPress={()=>{
                this.toggleModal(this.props.data.num-1)}}
                >
                <Text style={[styles.textTask,{textDecorationLine:this.state.status?'line-through':'none',}]}>{this.props.data.num}. {this.props.data.title}</Text>
                </TouchableOpacity>
                {this.state.isModalVisible>5?null:this.openInfoModal()}
            </View>
    
        );  }
    
}

export default ToDo;

const styles = StyleSheet.create({
    closed:{height:60, width:60, justifyContent:'center', alignItems:'center'},
    textTask: {
        fontSize: 14,
        color:'#50545D'
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
            alignItems:'center',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.18,
            shadowRadius: 8,
            shadowColor:'rgba(70, 93, 239, 0.18)',
            elevation: 14,
        },
        titletext:{
            fontSize:26
        },
        textComm:{
            fontSize:18,
            color:'#8c8c8c'
        }
    },
   
);