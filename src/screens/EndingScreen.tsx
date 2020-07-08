import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Textarea, Button} from 'native-base';

import CameraIcon from '../assets/icons/camera-icon.svg';

interface Props {}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  photoBtn: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  text: {
    marginBottom: 7,
    color: '#9999aa',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
  },
  bottomContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  textarea: {
    minHeight: 96,
    paddingTop: 6,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 19,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: '#55cc77',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});

const EndingScreen: React.FunctionComponent<Props> = () => {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.photoBtn}>
            <Text style={styles.text}>Фото</Text>

            <CameraIcon width={80} height={80} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <Textarea
            rowSpan={6}
            bordered
            underline={false}
            placeholder={'Введите сообщение'}
            style={styles.textarea}
          />

          <Button style={styles.button} rounded>
            <Text style={styles.buttonText}>Отправить</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default EndingScreen;
