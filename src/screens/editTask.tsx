import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CalendarIcon from "../assets/icons/calendar_icon.svg";
import { storeData, getData } from "../api/api"

import Logo from '../assets/icons/logo.svg';
import Header from "../components/header"
import { NavigationScreenProp } from 'react-navigation';
import InboxWhite from '../assets/icons/inbox_icon.svg'
import Arrow from "../assets/icons/arrow.svg"
import ArrowL from "../assets/icons/arrow_left.svg";
import Thick from "../assets/icons/plus_tick.svg"
interface Props {
    navigation: NavigationScreenProp<any, any>;
    title: string,
    comment: string,
    route:IRoute
}
interface IState {
    title: string,
    comment: string,
    index:number
}
interface IRoute{
    key:string,
    name:string,
    params:IState

}
class EditTask extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            title: '',
            comment: '',
            index:0
        }

    }
    // const a = {
    //     "navigation":
    //     {
    //         "addListener": [Function addListener],
    //         "canGoBack": [Function canGoBack],
    //         "closeDrawer": [Function anonymous],
    //         "dangerouslyGetParent": [Function dangerouslyGetParent],
    //         "dangerouslyGetState": [Function anonymous],
    //         "dispatch": [Function dispatch],
    //         "goBack": [Function anonymous],
    //         "isFocused": [Function isFocused],
    //         "jumpTo": [Function anonymous],
    //         "navigate": [Function anonymous],
    //         "openDrawer": [Function anonymous],
    //         "pop": [Function anonymous], "popToTop": [Function anonymous],
    //         "push": [Function anonymous], "removeListener": [Function removeListener],
    //         "replace": [Function anonymous], "reset": [Function anonymous],
    //         "setOptions": [Function setOptions], "setParams": [Function anonymous],
    //         "toggleDrawer": [Function anonymous]
    //     }, 
    //     "route": { "key": "EditTask-hv4L6G-Toxh1ZveTGeTCh", "name": "EditTask", "params": { "comment": "Aaa", "title": "" } }
    // }
    componentDidMount() {
        console.log("thiiss", this.props.route.params);
        this.setState({
            title:this.props.route.params.title,
            comment:this.props.route.params.comment,
            index:this.props.route.params.index
        })

    }
    editTask = (): void => {
        getData('tasks').then((tasks) => {
           for (let index = 0; index < tasks.length; index++) {
            
               if (index == this.state.index) {
                tasks[index].value=this.state.comment
                tasks[index].title=this.state.title
            } 
           }
            storeData('tasks', tasks).then(() => {
                this.props.navigation.goBack()
            })
        })
    }
    deleteTask=():void =>{
        getData('tasks').then((tasks) => {
            for (let index = 0; index < tasks.length; index++) {
                if (index == this.state.index) {
                 tasks.splice(index,1)
             } 
            }
             storeData('tasks', tasks).then(() => {
                 this.props.navigation.goBack()
             })
         })
    }
    render() {
      
        
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.screen}>
                    <View style={{ backgroundColor: '#3F93D9', height: 61, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 23 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <ArrowL />
                            <Text style={styles.title}>Отменить</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { this.editTask() }}
                        >
                            <View
                                style={{ flexDirection: 'row' }}>

                                <Text style={styles.title}>Сохранить</Text>
                                <Thick />
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ width: '100%', backgroundColor: '#F2F3F8', paddingBottom: 6 }}>
                        <View style={[styles.card, { marginTop: 7, paddingTop: 22 }]} >
                            <Text style={styles.titletext}>Название</Text>

                            <View style={{ width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#ABB3BA', backgroundColor: 'white' }}>
                                <TextInput
                                    style={[styles.input, {}]}
                                    multiline={true}
                                    numberOfLines={2}
                                    value={this.state.title}
                                    onChangeText={(r) => { this.setState({ title: r }) }}
                                    placeholderTextColor={'#ADB1B5'}
                                    placeholder={'Введите название'}
                                />
                            </View>
                        </View>
                        <View style={[styles.card, {}]} >
                            <Text style={styles.titletext}>Описание</Text>

                            <View style={{ width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#ABB3BA', }}>
                                <TextInput
                                    style={[styles.input, {}]}
                                    multiline={true}
                                    numberOfLines={2}
                                    value={this.state.comment}
                                    onChangeText={(r) => { this.setState({ comment: r }) }}
                                    placeholderTextColor={'#ADB1B5'}
                                    placeholder={'Напишите что-то'}
                                />
                            </View>
                        </View>
                    </View>
                    {/* <View style={{ width: '100%', backgroundColor: 'white', marginTop: 6, paddingBottom: 38 }}>
                    <View style={[styles.card, {}]} >
                        <Text style={styles.titletext}>Категория</Text>
                        <TouchableOpacity
                            style={styles.selectbtn}
                            onPress={()=>{getData('tasks')}                         }
                        >
                            <View style={styles.select}>
                            <View style={{ flexDirection: 'row' }}>
                                <InboxWhite    ></InboxWhite>
                                <Text style={styles.text}>Входящие</Text>
                                </View>
                                <Arrow/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> */}
                    <View style={{ width: '100%', alignItems: 'center', marginTop: 38 }}>
                        <Button
                            onPress={() => { this.deleteTask()}}
                            style={styles.button} >
                            <Text style={styles.buttonText}>Удалить задачу</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
};

export default EditTask
const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
        marginHorizontal: 10
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
        marginLeft: 12
    },
    selectbtn: {
        justifyContent: 'center',
        width: '100%',
        height: 51,
        backgroundColor: '#3F93D9',
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 1.65,

        elevation: 7,
    },
    select: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        alignItems: 'center'
    },
    titletext: {
        fontSize: 17,
        fontWeight: "600",
        color: '#363940'
    },
    checkbox: {
        alignSelf: "center",
        borderRadius: 20
    },
    card: {
        backgroundColor: 'white',
        width: "100%",
        paddingBottom: 22,        // borderColor: '#e6e6e6',
        // marginBottom: 5,
        paddingHorizontal: 23
    },
    textComm: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#9DA5B7'
    },
    textTask: {
        marginTop: 5,
        fontSize: 14,
    },
    screen: {
        alignItems: 'center',

        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    button: {

        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
        height: 51,
        backgroundColor: '#F56060',
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 1.65,

        elevation: 7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    input: {
        // paddingHorizontal: 17,

        // backgroundColor:'#F7F8F9',
        // alignItems: 'baseline',
        //  justifyContent: 'flex-start',
        //   width:'90%',
        //   height:130,
        //   borderWidth:1,
        //   borderRadius:2,
        //   borderColor:'rgba(0, 0, 0, 0.04)'

    },
    viewMark: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }
});