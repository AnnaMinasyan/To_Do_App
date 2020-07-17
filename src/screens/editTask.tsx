import React from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Button } from 'native-base';
import { storeData, getData } from "../api/api"
import { NavigationScreenProp } from 'react-navigation';
import ArrowL from "../assets/icons/arrow_left.svg";
import Thick from "../assets/icons/plus_tick.svg"
import Modal from 'react-native-modal';
import Close from "../assets/icons/close.svg"
interface Props {
    navigation: NavigationScreenProp<any, any>;
    title: string,
    comment: string,
    route: IRoute
}
interface IState {
    title: string,
    comment: string,
    index: number,
    day: string,
    isModalVisible: boolean
}
interface IRoute {
    key: string,
    name: string,
    params: IState
}
class EditTask extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            title: '',
            comment: '',
            index: 0,
            day: '',
            isModalVisible: false
        }
    }
    componentDidMount() {
        this.setState({
            title: this.props.route.params.title,
            comment: this.props.route.params.comment,
            index: this.props.route.params.index,
            day: this.props.route.params.day
        })
    }
    editTask = (): void => {
        getData(this.props.route.params.day).then((res) => {
            for (let index = 0; index < res.tasks.length; index++) {
                if (index == this.state.index) {
                    res.tasks[index].value = this.state.comment
                    res.tasks[index].title = this.state.title
                }
            }
            storeData(this.props.route.params.day, res).then(() => {
                this.props.navigation.goBack()
            })
        })
    }
    toggleModal(value: boolean) {
        this.setState({ isModalVisible: value });
    }
    openModal() {
        return <Modal
            onBackButtonPress={() => { this.toggleModal(false) }}
            isVisible={this.state.isModalVisible}>
            <View style={styles.modal}>
                <TouchableOpacity
                    style={{ position: 'absolute', right: 10, top: 5, }}
                    onPress={() => { this.toggleModal(false) }}  >
                    <View ><Close height={20} width={20} fill='#3F93D9' /></View>
                </TouchableOpacity>
                <View >
                    <Text style={{ fontSize: 20 }}>Bы уверены?</Text>
                </View>
                <View style={{ width: '60%', marginTop: 50, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {  this.deleteTask() }}  >
                        <View style={styles.btnYes}><Text style={{ fontSize: 16, color: 'white' }}>Да</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.toggleModal(false) }}  >
                        <View style={styles.btnNo}><Text style={{ fontSize: 16, color: 'white' }}>Нет</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    }
    deleteTask = (): void => {
        getData(this.props.route.params.day).then((data) => {
            for (let index = 0; index < data.tasks.length; index++) {
                if (index == this.state.index) {
                    data.tasks.splice(index, 1)
                }
            }
            storeData(this.props.route.params.day, data).then(() => {
                this.props.navigation.goBack(),
                this.toggleModal(false)
            })
        })
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.screen}>
                    <View style={{ backgroundColor: '#3F93D9', height: 61, width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 23 }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.goBack() }}>
                            <View style={{ flexDirection: 'row',justifyContent:'center', alignItems:'center'}}>
                                <ArrowL />
                                <Text style={styles.title}>Отменить</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.editTask() }}>
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
                            <View style={styles.inputLabel}>
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
                        <View style={styles.card} >
                            <Text style={styles.titletext}>Описание</Text>
                            <View style={{ width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#ABB3BA', }}>
                                <TextInput
                                    style={styles.input}
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
                    {this.state.isModalVisible ? this.openModal() : null}
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
                            onPress={() => { this.setState({ isModalVisible: true }) }}
                            style={styles.button} >
                            <Text style={styles.buttonText}>Удалить задачу</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default EditTask
const styles = StyleSheet.create({
    inputLabel: { width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#ABB3BA', backgroundColor: 'white' },
    btnYes: { width: 50, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 5 },
    btnNo: { width: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 5 },
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
        fontWeight: "bold",
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
    modal: {
        backgroundColor: '#F2F3F8',
        width: '100%',
        height: 200,
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewMark: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 }
});