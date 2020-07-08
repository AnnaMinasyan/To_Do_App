import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import TaskMarker from './TaskMarker';
import Mark from '../assets/icons/mark-icon.svg';
import Star from '../assets/icons/star-icon.svg';

interface Props {
  id: number;
  category: string;
  text: string;
  location: string;
  distance: number;
  date: string;
  price: number;
  deadline?: string;
  isResolved: boolean;
  reworkings: number;
  rating?: number;
  isOverdue?: boolean;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  itemMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTopTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemIdDate: {
    flexGrow: 1,
    marginBottom: 6,
    color: '#778899',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    letterSpacing: 0.6,
  },
  itemDeadline: {
    color: '#ee2222',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    letterSpacing: 0.6,
  },
  itemResolvedDeadline: {
    color: '#778899',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    letterSpacing: 0.6,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 24,
  },
  itemAdditionalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 61,
  },
  locationIcon: {
    width: 8,
    height: 12,
    marginRight: 5,
  },
  itemLocation: {
    color: '#0a7dfb',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 24,
  },
  itemDistance: {
    marginLeft: 'auto',
    color: '#778899',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 24,
  },
  ratingContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRating: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.6,
  },
  containerOverdue: {
    backgroundColor: '#ffdddd',
  },
});

const TaskItem: React.FunctionComponent<Props> = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.isOverdue ? styles.containerOverdue : null,
      ]}
      onPress={() => {
        if (props.price > 0) {
          navigation.navigate('PaidRequestScreen', {
            title: `№ ${props.id}`,
            text: props.text,
            date: props.date,
            price: `${props.price} ₽`,
            location: props.location,
          });
        } else {
          navigation.navigate('RequestScreen', {
            title: `№ ${props.id}`,
            text: props.text,
            date: props.date,
            location: props.location,
            isResolved: props.isResolved,
          });
        }
      }}>
      <View style={styles.itemMainContainer}>
        <TaskMarker
          category={props.category}
          price={props.price}
          isResolved={props.isResolved}
          reworkings={props.reworkings}
        />

        <View style={styles.itemTextContainer}>
          <View style={styles.itemTopTextContainer}>
            <Text style={styles.itemIdDate}>
              № {props.id} от {props.date}
            </Text>

            {props.deadline && (
              <Text
                style={
                  props.isResolved
                    ? styles.itemResolvedDeadline
                    : styles.itemDeadline
                }>
                {props.deadline}
              </Text>
            )}
          </View>

          <Text style={styles.itemText} numberOfLines={1}>
            {props.text}
          </Text>
        </View>
      </View>

      <View style={styles.itemAdditionalContainer}>
        <Mark style={styles.locationIcon} />
        <Text style={styles.itemLocation}>{props.location}</Text>
        {props.isResolved && props.rating ? (
          <View style={styles.ratingContainer}>
            <Star width={16} height={16} />
            <Text style={styles.itemRating}>{props.rating}</Text>
          </View>
        ) : (
          <Text style={styles.itemDistance}>{props.distance} м</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem;
