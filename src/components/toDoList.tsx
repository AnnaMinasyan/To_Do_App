import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import Check from "../assets/icons/checked-radio.svg"
import {storeData,getData} from "../api/api"
import Modal from 'react-native-modal';
import Close from "../assets/icons/close.svg"
import global_styles from "../assets/styles/global_styles"
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions" 
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
        onBackdropPress={()=>{this.toggleModal(6)}}
         isVisible={this.state.isModalVisible>5?false:true}>
          
            <View style={{ 
               backgroundColor:'#F2F3F8',
             width:calcWidth(311),
            height:calcHeight(316),
            paddingHorizontal:calcWidth(20),
            
            borderRadius:5
             }}>
      <ScrollView
    showsVerticalScrollIndicator={false}
       >
           <View style={{marginTop:calcHeight(20)}}>
           <Text style={global_styles.textComm}>Название</Text>
           <Text style={global_styles.h1}>{this.props.data.title}</Text>
          
           </View>
    <View style={{marginTop:calcHeight(28), }}>
    <Text style={global_styles.textComm}>Описание</Text>
    <Text style={[global_styles.textComm,{color:'#363940',paddingBottom:calcHeight(20),}]}>{this.props.data.value}</Text> 
    </View>
    </ScrollView>
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
                        <View style={[this.props.data.cancheck?styles.unchecked:[styles.unchecked,{backgroundColor:'#F7F8F9',borderColor:'#9DA5B7'}]]}>
                          
                            </View> :
                        <View style={styles.checked}>
                            <Check height={calcHeight(10)}/></View>}
                </TouchableOpacity>
                <TouchableOpacity
                style={{width:'100%', height:calcHeight(20)}}
                onPress={()=>{
                this.toggleModal(this.props.data.num-1)}}
                >
                <Text style={[styles.textTask,{textDecorationLine:this.state.status?'line-through':'none',}]} ellipsizeMode='tail' numberOfLines={1}>{this.props.data.num}. {this.props.data.title}</Text>
                </TouchableOpacity>
                {this.state.isModalVisible>5?null:this.openInfoModal()}
            </View>
    
        );  }
    
}

export default ToDo;

const styles = StyleSheet.create({
    closed:{height:60, width:60, justifyContent:'center', alignItems:'center'},
    textTask: {
        fontSize: calcFontSize(14),
        color:'#50545D',
        width:calcWidth(280)
    },
    unchecked:{
        height:calcHeight(22),
            width:calcWidth(18),
            borderWidth:calcHeight(1),
         borderColor:'#62646D',
         borderRadius:calcHeight(20),
         marginRight:calcWidth(14),
         
        },
        
        checked:{
            height:calcHeight(22),
            width:calcWidth(18),
            borderWidth:calcWidth(1),
            borderColor:'#3F93D9',
            borderRadius:calcHeight(20),
            marginRight:calcWidth(14),
            backgroundColor:'#3F93D9',
            justifyContent:'center',
            alignItems:'center',
            // shadowOffset: {
            //     width: 0,
            //     height: calcHeight(4),
            // },
            // shadowOpacity: 0.18,
            // shadowRadius: calcHeight(8),
            // shadowColor:'rgba(70, 93, 239, 0.18)',
            // elevation: 10,
        },
        titletext:{
            fontSize:calcFontSize(26)
        },
        textComm:{
            fontSize:calcFontSize(18),
            color:'#8c8c8c'
        }
    },
   
);