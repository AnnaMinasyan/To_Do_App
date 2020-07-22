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
import global_styles from "../assets/styles/global_styles"
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions" 
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
    isModalVisible: boolean,
    height:number,
    height2:number
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
            isModalVisible: false,
            height:calcHeight( this.props.route.params.title.length),
            height2:calcHeight(this.props.route.params.comment.length),
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
        onBackdropPress={() => { this.toggleModal(false) }}
            isVisible={this.state.isModalVisible}>
            <View style={global_styles.modal}>
                <TouchableOpacity
                      style={{  position: 'absolute', right: calcWidth(0), top: calcHeight(0),
                      height:calcHeight(40),width:calcWidth(40), paddingTop:calcHeight(14),paddingLeft:calcWidth(20) }}
                    onPress={() => { this.toggleModal(false) }}  >
                    <View ><Close height={calcHeight(14)} width={calcWidth(14)} fill='#8990A1'  /></View>
                </TouchableOpacity>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={global_styles.h1}>Bы уверены?</Text>
                <Text style={global_styles.textComm}>Сохранить изменения</Text>
            </View>
                <View style={{ width:'100%', marginTop: calcHeight(25), justifyContent: 'space-between', flexDirection: 'row',paddingHorizontal:calcWidth(40)}}>
                <TouchableOpacity
                        onPress={() => { this.toggleModal(false) }}  >
                        <View style={global_styles.btnNo}><Text style={{ fontSize: 16, color: 'white' }}>Нет</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {  this.deleteTask() }}  >
                        <View style={global_styles.btnYes}><Text style={{ fontSize: 16, color: 'white' }}>Да</Text></View>
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
                <View style={[styles.screen]}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.goBack() }}>
                            <View style={{ flexDirection: 'row',justifyContent:'center', alignItems:'center'}}>
                                <ArrowL height={calcHeight(15.31)} width={calcWidth(14)}  />
                                <Text style={styles.title}>Отменить</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.editTask() }}>
                            <View
                                style={{ flexDirection: 'row' }}>
                                <Text style={styles.title}>Сохранить</Text>
                                <Thick height={calcHeight(24)} width={calcWidth(24)} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[{ width: '100%', backgroundColor: '#F2F3F8', paddingBottom: calcHeight(6) },]}>
                        <View style={[styles.card, { marginTop: calcHeight(7), paddingTop: calcHeight(22), paddingBottom: calcHeight(27),}]} >
                            <Text style={global_styles.h1}>Название</Text>
                            <View style={styles.inputLabel}>
                                <TextInput
                                onContentSizeChange={(event) => {
                                    this.setState({ height2: event.nativeEvent.contentSize.height })
                                }}
                                    multiline={true}
                                    numberOfLines={2}
                                    value={this.state.title}
                                    onChangeText={(r) => { this.setState({ title: r }) }}
                                    placeholderTextColor={'#ADB1B5'}
                                    placeholder={'Введите название'}
                                    style={{fontSize:calcFontSize(13),paddingBottom:calcHeight(6),}}
                                />
                            </View>
                        </View>
                        <View style={[styles.card,{paddingBottom: calcHeight(38),}]} >
                            <Text style={global_styles.h1}>Описание</Text>
                            <View style={{ width: '100%',  borderBottomWidth: 1, borderColor: '#ABB3BA', }}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={2}
                                    onContentSizeChange={(event) => {
                                        this.setState({ height: event.nativeEvent.contentSize.height })
                                    }}
                                    value={this.state.comment}
                                    onChangeText={(r) => { this.setState({ comment: r }) }}
                                    placeholderTextColor={'#ADB1B5'}
                                    placeholder={'Напишите что-то'}
                                    style={{fontSize:calcFontSize(13),paddingBottom:calcHeight(6)}}
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
                    <View style={{ width: '100%', alignItems: 'center', marginTop: calcHeight(38), marginBottom:calcHeight(38) }}>
                        <Button
                            onPress={() => { this.setState({ isModalVisible: true }) }}
                            style={[global_styles.button,{backgroundColor:'#F56060'}]} >
                            <Text style={global_styles.buttonText}>Удалить задачу</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default EditTask
const styles = StyleSheet.create({
    inputLabel: { width: '100%', 
    
     borderBottomWidth: 1,
      borderColor: '#ABB3BA',
       backgroundColor: 'white' },
    
    title: {
        fontSize: calcFontSize(16),
        color: 'white',
        fontWeight: '600',
        marginHorizontal:calcWidth(10)
    },
    text: {
        fontSize: calcFontSize(14),
        fontWeight: '500',
        color: '#FFFFFF',
        marginLeft: calcWidth(12)
    },
    selectbtn: {
        justifyContent: 'center',
        width: '100%',
        height:calcHeight(51),
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
        marginHorizontal: calcWidth(20),
        alignItems: 'center'
    },
    titletext: {
        fontSize: calcFontSize(17),
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
                // borderColor: '#e6e6e6',
        // marginBottom: 5,
        paddingHorizontal: calcWidth(23)
    },
    textComm: {
        fontSize: calcFontSize(12),
        fontWeight: 'normal',
        color: '#9DA5B7'
    },
    textTask: {
        marginTop: calcHeight(5),
        fontSize: calcFontSize(14),
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
        fontSize: calcFontSize(16),
        fontWeight: '600',
    },
    
    modal: {
        backgroundColor: '#F2F3F8',
        width: '100%',
        height: calcHeight(200),
        paddingHorizontal: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewMark: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
    header: { 
        backgroundColor: '#3F93D9',
     height: calcHeight(61), 
     width: '100%', 
     alignItems: 'center', 
     flexDirection: 'row', 
     justifyContent: 'space-between',
      paddingHorizontal: calcWidth(23) }
});