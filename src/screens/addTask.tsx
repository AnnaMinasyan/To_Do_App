import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CalendarIcon from "../assets/icons/calendar_icon.svg";
import { storeData, getData } from "../api/api"
import moment from "moment";

import Logo from '../assets/icons/logo.svg';
import Header from "../components/Header"
import { NavigationScreenProp } from 'react-navigation';
import InboxWhite from '../assets/icons/inbox_icon.svg'
import Arrow from "../assets/icons/arrow.svg"
import ArrowL from "../assets/icons/arrow_left.svg";
import Thick from "../assets/icons/plus_tick.svg"
interface Props {
    navigation: NavigationScreenProp<any, any>;
    //key:string,

}



interface IState {
    title: string,
    comment: string,
    checkTitle: boolean,
    checkComment: boolean
}

class AddTask extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            title: '',
            comment: '',
            checkTitle: true,
            checkComment: true
        }

    }
    _valided() {
        this.setState({
            checkTitle: this.state.title.trim() != '',
            checkComment: this.state.comment.trim() != ''
        }, () => {
            if (this.state.checkTitle && this.state.checkComment) {
                this.addNewTask()
            }
        })
    }
    addNewTask = (): void => {

        const time = moment()
            .utcOffset('+05:30')
            .format('YYYY-MM-DD')

        getData(time).then((res) => {
            if (res && res.isfinished) {
                const tim = moment().add(1, 'days').utcOffset('+05:30')
                    .format('YYYY-MM-DD')
                getData(tim).then((tomorrow) => {
                    if (tomorrow.tasks.length < 5) {

                        tomorrow.tasks.push({ count: false, value: this.state.comment, title: this.state.title })
                    }

                    storeData(tim, tomorrow).then(() => {
                        this.props.navigation.goBack()
                    })
                })

            } else {
                if (res.tasks.length < 5) {
                    res.tasks.push({ count: false, value: this.state.comment, title: this.state.title })
                }

                storeData(time, res).then(() => {
                    this.props.navigation.goBack()
                })
            }
        })
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.screen}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <ArrowL />
                                <Text style={styles.title}>Отменить</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this._valided() }}
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

                            <View style={this.state.checkTitle ? [styles.input] : [styles.validation]}>
                                <TextInput
                                    onFocus={() => {
                                        this.setState({
                                            checkTitle: true
                                        })
                                    }}

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

                            <View style={this.state.checkComment ? [styles.input] : [styles.validation]}>
                                <TextInput
                                    onFocus={() => {
                                        this.setState({
                                            checkComment: true
                                        })
                                    }}
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
                </View>
            </ScrollView>
        );
    }
};

export default AddTask
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
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#ABB3BA',
        backgroundColor: 'white'
    },
    validation: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'red',
        backgroundColor: 'white'
    },
    viewMark: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24
    },
    header: { backgroundColor: '#3F93D9', height: 61, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 23 }
});