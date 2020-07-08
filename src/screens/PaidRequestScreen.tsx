import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';

import RequestMessage from '../components/RequestMessage';
import AnswerMessage from '../components/AnswerMessage';

import Mark from '../assets/icons/mark-icon.svg';

interface Props {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  datePriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  date: {
    color: '#778899',
    fontWeight: '400',
    letterSpacing: 0.8,
    lineHeight: 24,
  },
  price: {
    color: '#ff3333',
    fontWeight: '400',
    letterSpacing: 0.8,
    lineHeight: 24,
  },
  locationContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 8,
    color: '#0a7dfb',
    fontWeight: '400',
    letterSpacing: 0.8,
    lineHeight: 24,
  },
  buttonBlock: {
    flexDirection: 'row',
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
  },
  button: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    letterSpacing: 0.38,
    lineHeight: 20,
    textTransform: 'uppercase',
  },
});

// @ts-ignore
const PaidRequestScreen: React.FunctionComponent<Props> = ({route}) => {
  const content = {
    author: 'Констанция К.',
    date: '08.06.2019',
    text: 'Необходимо починить освещение в подъезде',
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>{route.params.text}</Text>

        <View style={styles.datePriceContainer}>
          <Text style={styles.date}>{route.params.date} 14:00 — 18:00</Text>
          <Text style={styles.price}>{route.params.price}</Text>
        </View>

        <View style={styles.locationContainer}>
          <Mark />
          <Text style={styles.location}>{route.params.location}</Text>
        </View>

        <RequestMessage
          author={content.author}
          date={content.date}
          text={content.text}
        />

        <AnswerMessage
          author={content.author}
          date={content.date}
          text={content.text}
        />

        <View style={styles.buttonBlock}>
          <Button transparent style={styles.button}>
            <Text style={styles.buttonText}>Отклонить</Text>
          </Button>
          <Button transparent style={styles.button}>
            <Text style={styles.buttonText}>Принять</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default PaidRequestScreen;
