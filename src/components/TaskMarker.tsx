import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Reply from '../assets/icons/reply-icon.svg';
import Lights from '../assets/icons/lights-icon.svg';
import Garbage from '../assets/icons/garbage-icon.svg';
import WaterTap from '../assets/icons/water-tap-icon.svg';

interface Props {
  category: string;
  price: number;
  isResolved: boolean;
  reworkings: number;
}

const styles = StyleSheet.create({
  imgContainer: {
    position: 'relative',
    marginRight: 12,
    paddingTop: 6,
  },
  itemPrice: {
    position: 'absolute',
    top: 0,
    left: 3,
    paddingHorizontal: 4,
    height: 18,
    backgroundColor: 'rgba(255, 51, 51, 0.8)',
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0.6,
    borderRadius: 12,
  },
  itemImgFill: {
    position: 'absolute',
    width: 48,
    height: 48,
    backgroundColor: 'rgba(68,85,102,0.8)',
    borderRadius: 24,
  },
  itemImgInner: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 24,
    height: 24,
  },
  itemTextInner: {
    position: 'absolute',
    color: '#fff',
    top: 14,
    left: 20,
  },
});

const TaskMarker: React.FunctionComponent<Props> = (props) => {
  return (
    <View style={styles.imgContainer}>
      {props.category === 'lights' && <Lights width={48} height={48} />}
      {props.category === 'garbage' && <Garbage width={48} height={48} />}
      {props.category === 'water-tap' && <WaterTap width={48} height={48} />}

      {props.price > 0 && !props.isResolved && (
        <Text style={styles.itemPrice}>{props.price} ₽</Text>
      )}

      {props.isResolved && props.reworkings > 0 && (
        <View style={styles.itemImgFill}>
          <Reply style={styles.itemImgInner} />
          <Text style={styles.itemTextInner}>{props.reworkings}</Text>
        </View>
      )}
    </View>
  );
};

export default TaskMarker;
