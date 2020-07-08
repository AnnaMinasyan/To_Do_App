import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'native-base';

import RequestMessage from '../components/RequestMessage';
import AnswerMessage from '../components/AnswerMessage';

import Mark from '../assets/icons/mark-icon.svg';

interface Props {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  breadcrumbsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  breadcrumb: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.6,
    lineHeight: 20,
  },
  arrow: {
    color: '#999',
  },
  dateContainer: {
    marginBottom: 10,
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
  deadline: {
    color: '#ee2222',
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
const RequestScreen: React.FunctionComponent<Props> = ({route}) => {
  const content = {
    author: 'Констанция К.',
    date: '08.06.2019',
    text: 'Необходимо починить освещение в подъезде',
  };

  const navigation = useNavigation();
  const [isApplied, makeApplied] = useState(!!route.params.isResolved);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={styles.breadcrumbsContainer}>
          <TouchableOpacity>
            <Text style={styles.breadcrumb}>Администрация г. Тулы</Text>
          </TouchableOpacity>
          <Text style={styles.arrow}>→</Text>
          <TouchableOpacity>
            <Text style={styles.breadcrumb}>
              Советский территориальный округ
            </Text>
          </TouchableOpacity>
          <Text style={styles.arrow}>→</Text>
          <TouchableOpacity>
            <Text style={styles.breadcrumb}>УК Стройкомплект</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.date}>{route.params.date}</Text>

          {isApplied && !route.params.isResolved && (
            <Text style={styles.deadline}>30.06.2019</Text>
          )}

          {route.params.isResolved && (
            <Text style={styles.date}>30.06.2019</Text>
          )}
        </View>

        <Text style={styles.title}>{route.params.text}</Text>

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

        {!route.params.isResolved && (
          <View style={styles.buttonBlock}>
            <Button transparent style={styles.button}>
              {!isApplied ? (
                <Text style={styles.buttonText}>Отклонить</Text>
              ) : (
                <Text style={styles.buttonText}>Продлить</Text>
              )}
            </Button>

            {!isApplied ? (
              <Button
                transparent
                style={styles.button}
                onPress={() => makeApplied(true)}>
                <Text style={styles.buttonText}>Принять</Text>
              </Button>
            ) : (
              <Button
                transparent
                style={styles.button}
                onPress={() => navigation.navigate('EndingScreen')}>
                <Text style={styles.buttonText}>Ответить</Text>
              </Button>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RequestScreen;
