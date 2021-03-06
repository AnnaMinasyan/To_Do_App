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
import moment from "moment";
import { storeData, getData } from "../api/api"
import Header from "../components/Header"
import { NavigationScreenProp } from 'react-navigation';
import Smile1 from "../assets/icons/bed_smile.svg"
import Smile2 from "../assets/icons/normal_smile.svg"
import Smile3 from "../assets/icons/happy_smile.svg"
import global_styles from "../assets/styles/global_styles"
import {calcFontSize,calcHeight,calcWidth} from "../assets/styles/dimensions" 

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface IState {
  mark: string,
  comment: string,
  isWriteComm: boolean,
  isChooseMarke: boolean
  selectedEmoji: number
}
interface IMarksList {
  title: string,
  Icon: any,
  selectedColor: string
}
const Emoji: IMarksList[] = [
  {
    title: 'Не доволен',
    Icon: Smile1,
    selectedColor: 'black'
  },
  {
    title: 'Нормально',
    Icon: Smile2,
    selectedColor: 'black'
  },
  {
    title: 'Прекрасно',
    Icon: Smile3,
    selectedColor: 'black'
  }
]
class DayReview extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      mark: '',
      comment: '',
      isWriteComm: false,
      isChooseMarke: false,
      selectedEmoji: 4
    }

  }
  finishedTask() {
    const time = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD')
    getData(time).then((data) => {
      data.isfinished = true
      data.review = this.state.comment
      data.mark = this.state.mark
      storeData(time, data).then(() => {
        this.props.navigation.navigate('MainTasks')
      })

    })
  }
  changeMark(index: number) {
    this.setState({
      selectedEmoji: index,
      mark: Emoji[index].title
    })
  }
  isFinishedReview() {
    let isfinished = true
    if (this.state.comment == '') {
      isfinished = false
      this.setState({ isWriteComm: true })
    } else { this.setState({ isWriteComm: false }) }
    if (this.state.mark == '') {
      isfinished = false
      this.setState({ isChooseMarke: true })
    } else { this.setState({ isChooseMarke: false }) }
    if (isfinished) {
      this.finishedTask()
    }
  }
  onNavigateMenu = (): void => {
    this.props.navigation.navigate('MenuDrawer')
  };
  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.screen}>
          <Header text='Обзор дня ' onPress={() => { this.onNavigateMenu() }} add={false} onNavigate={() => { }} />
          <View style={{ width: '100%' }}>
            <View style={[global_styles.card, { marginTop: 7 }]} >
              <Text style={styles.titletext}>Заметки</Text>
              <Text style={global_styles.textComm}>К заполнению не обязательно</Text>
            </View>
          </View>
          <View style={styles.inputview}>
            <TextInput
              value={this.state.comment}
              style={[global_styles.textComm, {color:'#ADB1B5'}]}
              multiline={true}
              onChangeText={(r) => { this.setState({ comment: r }) }}
              placeholderTextColor={this.state.isWriteComm ? 'red' : '#ADB1B5'}
              placeholder={!this.state.isWriteComm ? 'Здесь вы можете оставить заметку' : 'Здесь вы должен оставить заметку'}
            />
          </View>
          <View style={[global_styles.card, { marginTop: calcHeight(7), width:'100%'}]} >
            <Text style={[styles.titletext,]}>Оценить продуктивность</Text>
            {this.state.isChooseMarke ? <View>
              <Text style={[global_styles.textComm, { color: 'red' }]}>Оценка обязательнօ</Text>
            </View> : null}
            <View style={styles.viewMark}>
              {Emoji.map((data, index) => {
                const { Icon, title, selectedColor } = data
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.changeMark(index)
                    }}
                    style={{ alignItems: 'center' }}>
                    <Icon height={calcHeight(27)} width={calcWidth(31)} fill={index == this.state.selectedEmoji ? selectedColor : "#9DA5B7"} />
                    <Text style={[global_styles.textComm, {marginTop:calcHeight(6), fontSize: calcFontSize(13),color:index == this.state.selectedEmoji ? selectedColor : "#9DA5B7"}]}>{title}</Text>
                  </TouchableOpacity>
                )
              })}
              
            </View>
          </View>
         <View style={{marginTop:calcHeight(60)}}>
         <Button
            onPress={() => {
              this.finishedTask()
            }}
            style={global_styles.button}>
            <Text style={global_styles.buttonText}>Закончить</Text>
          </Button>
         </View>
        </View>
      </ScrollView>
    );
  }
};
export default DayReview;

const styles = StyleSheet.create({

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
    paddingTop: calcHeight(17),
    paddingBottom: calcHeight(30),

    // borderColor: '#e6e6e6',
    // marginBottom: 5,
    //paddingHorizontal: 23
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
    width: calcWidth(280),
    height: calcHeight(55),
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
  buttonText: {
    color: '#fff',
    fontSize: calcFontSize(16),
    fontWeight: '600',
  },
  input: {
    paddingHorizontal: 17,
    backgroundColor: '#F7F8F9',
    width: '90%',
  },
  viewMark: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: calcWidth(24),
    marginRight:calcWidth(23)
  },
  inputview: {
    width: '90%',
    //alignItems: 'center',
    marginTop:calcHeight(20),
    height: calcHeight(130),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    backgroundColor: '#F7F8F9',
    marginHorizontal: calcWidth(17),
    paddingLeft:calcWidth(17)
  },
  validedInputview: {
    width: '90%',
    alignItems: 'center',
    height: 130,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    backgroundColor: '#F7F8F9',
    marginHorizontal: 17
  }
});